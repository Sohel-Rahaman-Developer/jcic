import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { DonationCard } from "@/components/cards/DonationCard";
import { donations } from "@/data/donations";
import { Search, Heart } from "lucide-react";

export default function DonationOpportunities() {
  const [search, setSearch] = useState("");

  const filtered = donations.filter((d) => {
    const q = search.toLowerCase();
    return !search || d.title.toLowerCase().includes(q) || d.organization.toLowerCase().includes(q) || d.category.toLowerCase().includes(q);
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-rose-950 via-[#1a0a0a] to-slate-900 pt-24 pb-12">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-4 bg-rose-500/20 text-rose-300 border-rose-500/30 gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                Donations
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Donation Opportunities</h1>
              <p className="text-white/60 mt-3 text-lg">
                Support {donations.length} social impact initiatives in West Bengal
              </p>
            </motion.div>
          </div>
        </div>

        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border py-3">
          <div className="container mx-auto px-4 lg:px-8 flex gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search causes..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="input-search-donations" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          <p className="text-sm text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> campaigns
          </p>
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((d, i) => <DonationCard key={d.id} donation={d} index={i} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No campaigns found</h3>
              <Button variant="outline" className="mt-4" onClick={() => setSearch("")}>Clear Search</Button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
