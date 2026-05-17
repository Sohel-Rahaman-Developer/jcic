import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { JobCard } from "@/components/cards/JobCard";
import { jobs } from "@/data/jobs";
import { Search, Briefcase } from "lucide-react";

const types = ["All Types", "Full-time", "Part-time", "Remote"];
const categories = ["All Categories", "Engineering", "Product", "Business", "Operations", "Content", "Design", "Finance", "Field Operations"];

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [category, setCategory] = useState("All Categories");

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    const matchSearch = !search || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.tags.some((t) => t.toLowerCase().includes(q));
    const matchType = type === "All Types" || j.type === type;
    const matchCat = category === "All Categories" || j.category === category;
    return matchSearch && matchType && matchCat;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-slate-950 via-[#0A1628] to-slate-900 pt-24 pb-12">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Job Board</Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Jobs at Startups</h1>
              <p className="text-white/60 mt-3 text-lg">
                {jobs.length} open roles at verified West Bengal startups
              </p>
            </motion.div>
          </div>
        </div>

        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border py-3">
          <div className="container mx-auto px-4 lg:px-8 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search jobs..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="input-search-jobs" />
            </div>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-36" data-testid="select-job-type"><SelectValue /></SelectTrigger>
              <SelectContent>{types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-44" data-testid="select-job-category"><SelectValue /></SelectTrigger>
              <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          <p className="text-sm text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> jobs
          </p>
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No jobs found</h3>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setType("All Types"); setCategory("All Categories"); }}>Clear Filters</Button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
