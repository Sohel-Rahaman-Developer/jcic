import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/data/projects";
import { Search, FolderOpen } from "lucide-react";

const statuses = ["All Statuses", "Active", "Completed", "Seeking Collaborators"];
const categories = ["All Categories", "CleanTech", "Climate Tech", "AI / NLP", "AgriTech", "HealthTech", "Manufacturing"];

export default function Projects() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [category, setCategory] = useState("All Categories");

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !search || p.title.toLowerCase().includes(q) || p.institution.toLowerCase().includes(q);
    const matchStatus = status === "All Statuses" || p.status === status;
    const matchCat = category === "All Categories" || p.category === category;
    return matchSearch && matchStatus && matchCat;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-slate-950 via-[#0A1628] to-slate-900 pt-24 pb-12">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Research Projects</Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Innovation Projects</h1>
              <p className="text-white/60 mt-3 text-lg">
                {projects.length} research and innovation projects seeking collaborators and funding
              </p>
            </motion.div>
          </div>
        </div>

        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border py-3">
          <div className="container mx-auto px-4 lg:px-8 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="input-search-projects" />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-48" data-testid="select-project-status"><SelectValue /></SelectTrigger>
              <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-44" data-testid="select-project-category"><SelectValue /></SelectTrigger>
              <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          <p className="text-sm text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> projects
          </p>
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No projects found</h3>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setStatus("All Statuses"); setCategory("All Categories"); }}>Clear Filters</Button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
