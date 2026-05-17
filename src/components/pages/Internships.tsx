import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { JobCard } from "@/components/cards/JobCard";
import { internships } from "@/data/internships";
import { Search, GraduationCap } from "lucide-react";

const categories = ["All Categories", "Engineering", "Marketing", "Research", "Operations", "Design", "Finance"];
const locations = ["All Locations", "Remote", "Kolkata", "Siliguri", "Coochbehar"];

export default function Internships() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");

  const filtered = internships.filter((i) => {
    const q = search.toLowerCase();
    const matchSearch = !search || i.title.toLowerCase().includes(q) || i.company.toLowerCase().includes(q) || i.tags.some((t) => t.toLowerCase().includes(q));
    const matchCat = category === "All Categories" || i.category === category;
    const matchLoc = location === "All Locations" || i.location.includes(location);
    return matchSearch && matchCat && matchLoc;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-slate-950 via-[#0A1628] to-slate-900 pt-24 pb-12">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Internships</Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Internship Opportunities</h1>
              <p className="text-white/60 mt-3 text-lg">
                {internships.length} internship roles at innovative startups in West Bengal
              </p>
            </motion.div>
          </div>
        </div>

        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border py-3">
          <div className="container mx-auto px-4 lg:px-8 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search internships..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="input-search-internships" />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-44" data-testid="select-internship-category"><SelectValue /></SelectTrigger>
              <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-40" data-testid="select-internship-location"><SelectValue /></SelectTrigger>
              <SelectContent>{locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          <p className="text-sm text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> internships
          </p>
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((intern, i) => (
                <JobCard
                  key={intern.id}
                  job={{ ...intern, type: "Internship", category: intern.category, salary: intern.stipend, experience: intern.duration, deadline: intern.deadline }}
                  index={i}
                  isInternship
                  internshipData={{ duration: intern.duration, stipend: intern.stipend }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No internships found</h3>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setCategory("All Categories"); setLocation("All Locations"); }}>Clear Filters</Button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
