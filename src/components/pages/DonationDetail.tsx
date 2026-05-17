import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { donations } from "@/data/donations";
import { ArrowLeft, Users, Calendar, Heart, Bookmark, Share2 } from "lucide-react";

export default function DonationDetail() {
  const { id } = useParams<{ id: string }>();
  const donation = donations.find((d) => d.id === id);

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Campaign not found</h2>
          <Link href="/donations"><Button className="mt-4">Back to Donations</Button></Link>
        </div>
      </div>
    );
  }

  const progress = Math.round((donation.raisedNum / donation.goalNum) * 100);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="relative h-56 lg:h-72 overflow-hidden">
          <img src={donation.coverImage} alt={donation.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <Link href="/donations" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Donations
            </Link>
            <Badge className="mb-2 bg-rose-500/30 text-rose-200 border-rose-500/30">{donation.category}</Badge>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white">{donation.title}</h1>
            <p className="text-white/70 mt-1">{donation.organization}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="bg-card border border-card-border rounded-2xl p-5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-2xl font-bold text-foreground">{donation.raised}</p>
                      <p className="text-sm text-muted-foreground">of {donation.goal}</p>
                    </div>
                    <Progress value={progress} className="h-3 mb-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{donation.donors} donors</span>
                      <span className="font-semibold text-primary">{progress}% funded</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {new Date(donation.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5"><Bookmark className="w-3.5 h-3.5" />Save</Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5"><Share2 className="w-3.5 h-3.5" />Share</Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-5 text-white space-y-3">
                  <h3 className="font-bold text-lg">Support This Cause</h3>
                  <Button className="w-full bg-white text-rose-600 hover:bg-white/90 font-semibold gap-1.5" data-testid="button-donate-now">
                    <Heart className="w-4 h-4" />
                    Donate Now
                  </Button>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" data-testid="button-request-verification">Request Verification</Button>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" data-testid="button-contact-organizer">Contact Organizer</Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 order-1 lg:order-2 space-y-8">
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-bold text-foreground mb-3">About This Campaign</h2>
                <p className="text-muted-foreground leading-relaxed">{donation.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {donation.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-bold text-foreground mb-4">Expected Impact</h2>
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                  <p className="text-green-800 leading-relaxed">{donation.impact}</p>
                </div>
              </motion.section>
            </div>
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
          <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white gap-1.5" data-testid="button-mobile-donate">
            <Heart className="w-4 h-4" /> Donate Now
          </Button>
        </div>
        <div className="lg:hidden pb-20" />
        <Footer />
      </div>
    </PageTransition>
  );
}

