import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ecosystemStats } from "@/data/ecosystem";
import { Rocket, Target, Lightbulb, Users, ArrowRight, Building2, Globe, Award } from "lucide-react";

const team = [
  { name: "Prof. Abhijit Roy", role: "Chairman, JCIC", avatar: "https://picsum.photos/seed/team1/200/200", bio: "Former Vice-Chancellor, leading the vision for West Bengal's innovation renaissance." },
  { name: "Dr. Meenakshi Sen", role: "Director, Startup Programs", avatar: "https://picsum.photos/seed/team2/200/200", bio: "15 years experience building startup ecosystems across India and Southeast Asia." },
  { name: "Anirban Dey", role: "Head, Investor Relations", avatar: "https://picsum.photos/seed/team3/200/200", bio: "Former investment manager at SIDBI, deeply networked in the Bengali diaspora VC world." },
  { name: "Sohel Rahaman", role: "Platform Lead", avatar: "https://picsum.photos/seed/team4/200/200", bio: "Built the JCIC Innovation Platform from the ground up. Passionate about tech for social good." },
];

const partners = [
  "Govt. of West Bengal", "IIT Kharagpur", "Jadavpur University", "IISER Kolkata", "SIDBI", "TiE Bengal", "CII Eastern Region", "Bengal Chamber of Commerce"
];

const pillars = [
  { icon: Target, title: "Verified Discovery", desc: "Every startup, project, and opportunity on JCIC is vetted by our editorial team and verified against government records." },
  { icon: Lightbulb, title: "Knowledge Exchange", desc: "We facilitate mentorship, research collaboration, and knowledge transfer between academia, industry, and government." },
  { icon: Users, title: "Inclusive Access", desc: "From Kolkata metro to Coochbehar district â€” JCIC ensures every innovator, regardless of location, has a platform." },
];

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-950 via-[#0A1628] to-slate-900 pt-24 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">About JCIC</Badge>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                Building West Bengal's{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">
                  Innovation Future
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed">
                The Jhargram Centre for Innovation and Creativity (JCIC) is an institutional initiative to build a credible, accessible, and thriving startup ecosystem across West Bengal â€” from its metro hubs to its deepest rural districts.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mission */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We believe that groundbreaking innovation doesn't only happen in Bengaluru or Mumbai. West Bengal â€” with its rich tradition of intellectual excellence, its world-class universities, and its entrepreneurial craftspeople â€” has the raw material to become India's next great startup hub.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  JCIC's mission is to be the connective tissue of this ecosystem â€” the trusted platform where startups get discovered, investors find opportunity, students find careers, and researchers find collaborators.
                </p>
                <Link href="/explore">
                  <Button className="mt-6 gap-2">
                    Explore the Platform <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://picsum.photos/seed/about-office/800/500"
                  alt="JCIC Innovation Hub"
                  className="w-full rounded-2xl object-cover aspect-video"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary rounded-2xl p-4 shadow-xl">
                  <p className="text-white font-bold text-2xl">2019</p>
                  <p className="text-white/70 text-sm">Founded</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Three Pillars of JCIC</h2>
              <p className="text-muted-foreground mt-2">The foundational principles that guide everything we do</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-card-border rounded-2xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {ecosystemStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center"
                >
                  <p className="text-3xl font-extrabold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Leadership Team</h2>
              <p className="text-muted-foreground mt-2">The people driving West Bengal's innovation agenda</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-card-border rounded-2xl p-5 text-center hover:shadow-md transition-shadow"
                >
                  <Avatar className="w-20 h-20 mx-auto mb-3 border-2 border-border">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-lg font-bold">{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground">Our Partners &amp; Backers</h2>
            </motion.div>
            <div className="flex flex-wrap gap-3 justify-center">
              {partners.map((partner, i) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-secondary border border-border rounded-xl px-5 py-3 text-sm font-medium text-foreground"
                >
                  {partner}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}

