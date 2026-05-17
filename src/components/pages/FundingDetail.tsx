import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { funding } from "@/data/funding";
import { ArrowLeft, Calendar, Users, TrendingUp, CheckCircle2, Bookmark, Share2 } from "lucide-react";

export default function FundingDetail() {
  const { id } = useParams<{ id: string }>();
  const fund = funding.find((f) => f.id === id);

  if (!fund) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Funding opportunity not found</h2>
          <Link href="/funding"><Button className="mt-4">Back to Funding</Button></Link>
        </div>
      </div>
    );
  }

  const statusColor = fund.status === "Open" ? "bg-green-100 text-green-700 border-green-200" : fund.status === "Closing Soon" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-gray-100 text-gray-600";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="relative h-56 lg:h-72 overflow-hidden">
          <img src={fund.coverImage} alt={fund.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <Link href="/funding" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Funding
            </Link>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white">{fund.title}</h1>
            <p className="text-white/70 mt-1">{fund.organization}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="bg-card border border-card-border rounded-2xl p-5 space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-9 h-9 rounded-xl">
                        <AvatarImage src={fund.logo} />
                        <AvatarFallback className="rounded-xl">{fund.organization[0]}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium text-foreground">{fund.organization}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-secondary rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">Amount</p>
                        <p className="font-bold text-foreground text-sm mt-0.5">{fund.amount}</p>
                      </div>
                      <div className="bg-secondary rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">Equity</p>
                        <p className="font-bold text-foreground text-sm mt-0.5">{fund.equity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {new Date(fund.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{fund.applicants} applicants so far</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={statusColor}>{fund.status}</Badge>
                      <Badge variant="outline">{fund.stage}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5"><Bookmark className="w-3.5 h-3.5" />Save</Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5"><Share2 className="w-3.5 h-3.5" />Share</Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-5 text-white space-y-3">
                  <h3 className="font-bold text-lg">Apply for Funding</h3>
                  <Button className="w-full bg-white text-primary hover:bg-white/90 font-semibold" data-testid="button-request-investment">Request Investment</Button>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" data-testid="button-download-pitch">Download Pitch Deck</Button>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" data-testid="button-contact-fund-manager">Contact Fund Manager</Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 order-1 lg:order-2 space-y-8">
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-bold text-foreground mb-3">About This Fund</h2>
                <p className="text-muted-foreground leading-relaxed">{fund.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {fund.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </motion.section>

              {fund.requirements && fund.requirements.length > 0 && (
                <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-xl font-bold text-foreground mb-4">Eligibility Requirements</h2>
                  <div className="space-y-3">
                    {fund.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-3 bg-secondary/50 rounded-xl p-3.5">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">{req}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-bold text-foreground mb-4">Fund Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Investment Range", value: fund.amount },
                    { label: "Equity Stake", value: fund.equity },
                    { label: "Stage Focus", value: fund.stage },
                    { label: "Category", value: fund.category },
                    { label: "Deadline", value: new Date(fund.deadline).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) },
                    { label: "Applicants", value: `${fund.applicants} applied` },
                  ].map((item) => (
                    <div key={item.label} className="bg-card border border-card-border rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-semibold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
          <Button className="w-full" data-testid="button-mobile-apply-funding">Apply for Funding</Button>
        </div>
        <div className="lg:hidden pb-20" />
        <Footer />
      </div>
    </PageTransition>
  );
}

