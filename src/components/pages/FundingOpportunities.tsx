import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { FundingCard } from "@/components/cards/FundingCard";
import { funding } from "@/data/funding";
import { Search, TrendingUp } from "lucide-react";

const stages = ["All Stages", "Pre-Seed", "Seed", "Series A"];
const statuses = ["All Statuses", "Open", "Closing Soon", "Closed"];

export default function FundingOpportunities() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All Stages");
  const [status, setStatus] = useState("All Statuses");

  const filtered = funding.filter((f) => {
    const q = search.toLowerCase();
    const matchSearch = !search || f.title.toLowerCase().includes(q) || f.organization.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
    const matchStage = stage === "All Stages" || f.stage === stage;
    const matchStatus = status === "All Statuses" || f.status === status;
    return matchSearch && matchStage && matchStatus;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-slate-950 via-[#0A1628] to-slate-900 pt-24 pb-12">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Funding</Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Funding Opportunities</h1>
              <p className="text-white/60 mt-3 text-lg">
                {funding.length} funding sources — grants, equity, and debt — for startups at every stage
              </p>
            </motion.div>
          </div>
        </div>

        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border py-3">
          <div className="container mx-auto px-4 lg:px-8 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search funding..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="input-search-funding" />
            </div>
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger className="w-36" data-testid="select-funding-stage"><SelectValue /></SelectTrigger>
              <SelectContent>{stages.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-40" data-testid="select-funding-status"><SelectValue /></SelectTrigger>
              <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          <p className="text-sm text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> opportunities
          </p>
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((f, i) => <FundingCard key={f.id} funding={f} index={i} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No funding opportunities found</h3>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setStage("All Stages"); setStatus("All Statuses"); }}>Clear Filters</Button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
