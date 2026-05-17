import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { startups } from "@/data/startups";
import {
  MapPin, Users, CheckCircle2, Globe, ArrowLeft, Bookmark, Share2, TrendingUp, Calendar, ChevronRight
} from "lucide-react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa6";

export default function StartupDetail() {
  const { id } = useParams<{ id: string }>();
  const startup = startups.find((s) => s.id === id);

  if (!startup) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Startup not found</h2>
          <Link href="/startups"><Button className="mt-4">Back to Startups</Button></Link>
        </div>
      </div>
    );
  }

  const progress = Math.round((startup.fundingRaisedNum / startup.fundingGoalNum) * 100);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Cover */}
        <div className="relative h-64 lg:h-80 overflow-hidden">
          <img src={startup.coverImage} alt={startup.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <Link href="/startups" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Startups
            </Link>
            <div className="flex items-end gap-4">
              <Avatar className="w-16 h-16 rounded-2xl border-4 border-white shadow-xl">
                <AvatarImage src={startup.logo} alt={startup.name} />
                <AvatarFallback className="rounded-2xl text-xl font-bold">{startup.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-white">{startup.name}</h1>
                  {startup.verified && <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />}
                </div>
                <p className="text-white/70 text-lg">{startup.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT SIDEBAR */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                {/* Info card */}
                <div className="bg-card border border-card-border rounded-2xl p-5 space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={startup.founderAvatar} />
                        <AvatarFallback>{startup.founder[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{startup.founder}</p>
                        <p className="text-xs text-muted-foreground">Founder</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{startup.location}, West Bengal</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4 flex-shrink-0" />
                      <span>{startup.employees} employees</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>Founded {startup.founded}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Badge>{startup.stage}</Badge>
                      <Badge variant="secondary">{startup.industry}</Badge>
                      {startup.verified && <Badge className="bg-green-100 text-green-700 border-green-200 gap-1"><CheckCircle2 className="w-3 h-3" />Verified</Badge>}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border flex gap-2">
                    {startup.website && (
                      <a href={startup.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                        <Globe className="w-3.5 h-3.5" /> Website
                      </a>
                    )}
                    <a href="#" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"><FaLinkedinIn className="w-3.5 h-3.5" /> LinkedIn</a>
                    <a href="#" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"><FaTwitter className="w-3.5 h-3.5" /> Twitter</a>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                      <Bookmark className="w-3.5 h-3.5" />Save
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                      <Share2 className="w-3.5 h-3.5" />Share
                    </Button>
                  </div>
                </div>

                {/* CTA card */}
                <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-5 text-white space-y-3">
                  <h3 className="font-bold text-lg">Interested in {startup.name}?</h3>
                  <div className="space-y-2">
                    <Button className="w-full bg-white text-primary hover:bg-white/90 font-semibold" data-testid="button-express-interest">
                      Express Interest
                    </Button>
                    <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" data-testid="button-download-deck">
                      Download Pitch Deck
                    </Button>
                    <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" data-testid="button-contact-founder">
                      Contact Founder
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER CONTENT */}
            <div className="lg:col-span-2 order-1 lg:order-2 space-y-10">
              {/* About */}
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-bold text-foreground mb-3">About {startup.name}</h2>
                <p className="text-muted-foreground leading-relaxed">{startup.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {startup.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </motion.section>

              {/* Problem & Solution */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-bold text-foreground mb-4">Problem &amp; Solution</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                    <h3 className="font-semibold text-red-800 mb-2">The Problem</h3>
                    <p className="text-sm text-red-700 leading-relaxed">{startup.problem}</p>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                    <h3 className="font-semibold text-green-800 mb-2">Our Solution</h3>
                    <p className="text-sm text-green-700 leading-relaxed">{startup.solution}</p>
                  </div>
                </div>
              </motion.section>

              {/* Gallery */}
              {startup.gallery && startup.gallery.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xl font-bold text-foreground mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {startup.gallery.map((img, i) => (
                      <div key={i} className="aspect-video rounded-xl overflow-hidden">
                        <img src={img} alt={`${startup.name} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Metrics */}
              {startup.metrics && (
                <motion.section
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xl font-bold text-foreground mb-4">Key Metrics</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(startup.metrics).map(([key, value]) => (
                      <div key={key} className="bg-secondary rounded-2xl p-4 text-center">
                        <p className="text-2xl font-bold text-foreground">{value}</p>
                        <p className="text-xs text-muted-foreground capitalize mt-1">{key}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Funding Progress */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-bold text-foreground mb-4">Funding Progress</h2>
                <div className="bg-card border border-card-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-3xl font-bold text-foreground">{startup.fundingRaised}</p>
                      <p className="text-sm text-muted-foreground">raised of {startup.fundingGoal} goal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{progress}%</p>
                      <p className="text-sm text-muted-foreground">funded</p>
                    </div>
                  </div>
                  <Progress value={progress} className="h-3 mb-3" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Equity offered: {startup.equity}</span>
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <TrendingUp className="w-3.5 h-3.5" /> {startup.stage}
                    </span>
                  </div>
                </div>
              </motion.section>

              {/* Timeline */}
              {startup.timeline && startup.timeline.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xl font-bold text-foreground mb-4">Journey Timeline</h2>
                  <div className="relative pl-6 space-y-6">
                    <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />
                    {startup.timeline.map((item, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-4 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white shadow" />
                        <p className="text-xs text-muted-foreground mb-0.5">{item.date}</p>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Team */}
              {startup.team && startup.team.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xl font-bold text-foreground mb-4">Team</h2>
                  <div className="flex flex-wrap gap-4">
                    {startup.team.map((member, i) => (
                      <div key={i} className="flex items-center gap-3 bg-secondary rounded-xl p-3 pr-5">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* FAQs */}
              {startup.faqs && startup.faqs.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {startup.faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-card-border rounded-xl px-4">
                        <AccordionTrigger className="text-sm font-medium text-foreground">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.section>
              )}
            </div>
          </div>
        </div>

        {/* Mobile sticky CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 flex gap-2">
          <Button className="flex-1" data-testid="button-mobile-interest">Express Interest</Button>
          <Button variant="outline" className="flex-1" data-testid="button-mobile-contact">Contact Founder</Button>
        </div>
        <div className="lg:hidden pb-20" />

        <Footer />
      </div>
    </PageTransition>
  );
}

