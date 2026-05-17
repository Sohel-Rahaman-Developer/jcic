import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { StartupCard } from "@/components/cards/StartupCard";
import { startups } from "@/data/startups";
import { Search, SlidersHorizontal, Building2 } from "lucide-react";

const stages = ["All Stages", "Pre-Seed", "Seed", "Series A"];
const industries = ["All Industries", "AgriTech", "HealthTech", "EdTech", "Fintech", "CleanTech", "Robotics", "E-Commerce", "Cybersecurity"];
const locations = ["All Locations", "Kolkata", "Siliguri", "Coochbehar"];

export default function Startups() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All Stages");
  const [industry, setIndustry] = useState("All Industries");
  const [location, setLocation] = useState("All Locations");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = startups.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !search || s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q) || s.industry.toLowerCase().includes(q);
    const matchStage = stage === "All Stages" || s.stage === stage;
    const matchIndustry = industry === "All Industries" || s.industry === industry;
    const matchLocation = location === "All Locations" || s.location === location;
    const matchVerified = !verifiedOnly || s.verified;
    return matchSearch && matchStage && matchIndustry && matchLocation && matchVerified;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-950 via-[#0A1628] to-slate-900 pt-24 pb-14">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Startup Directory</Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Verified Startups</h1>
              <p className="text-white/60 mt-3 text-lg max-w-2xl">
                Discover {startups.length} verified startups building the future of West Bengal's economy.
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                {[
                  { label: "Total Startups", value: "248+" },
                  { label: "Verified", value: "189" },
                  { label: "Total Funding", value: "₹42Cr+" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-sm text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filters */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border py-3">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search startups..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="input-search-startups" />
              </div>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger className="w-36" data-testid="select-stage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-44" data-testid="select-industry">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-40" data-testid="select-location">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button
                variant={verifiedOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                data-testid="button-verified-only"
              >
                Verified Only
              </Button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> startups
            </p>
          </div>
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((s, i) => <StartupCard key={s.id} startup={s} index={i} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground">No startups found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setStage("All Stages"); setIndustry("All Industries"); setLocation("All Locations"); setVerifiedOnly(false); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
