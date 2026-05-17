import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { StartupCard } from "@/components/cards/StartupCard";
import { FundingCard } from "@/components/cards/FundingCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { DonationCard } from "@/components/cards/DonationCard";
import { JobCard } from "@/components/cards/JobCard";
import { startups } from "@/data/startups";
import { funding } from "@/data/funding";
import { projects } from "@/data/projects";
import { donations } from "@/data/donations";
import { jobs } from "@/data/jobs";
import { Search, LayoutGrid, List, X } from "lucide-react";

type ContentType = "all" | "startups" | "funding" | "projects" | "donations" | "jobs";

const contentTypes: { value: ContentType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "startups", label: "Startups" },
  { value: "funding", label: "Funding" },
  { value: "projects", label: "Projects" },
  { value: "donations", label: "Donations" },
  { value: "jobs", label: "Jobs" },
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [contentType, setContentType] = useState<ContentType>("all");
  const [stage, setStage] = useState("All");
  const [region, setRegion] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const q = search.toLowerCase();

  const filteredStartups = startups.filter((s) => {
    const matchSearch = !search || s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q) || s.industry.toLowerCase().includes(q);
    const matchStage = stage === "All" || s.stage === stage;
    const matchRegion = region === "All" || s.location === region;
    const matchVerified = !verifiedOnly || s.verified;
    return matchSearch && matchStage && matchRegion && matchVerified;
  });

  const filteredFunding = funding.filter((f) => !search || f.title.toLowerCase().includes(q) || f.organization.toLowerCase().includes(q));
  const filteredProjects = projects.filter((p) => !search || p.title.toLowerCase().includes(q) || p.institution.toLowerCase().includes(q));
  const filteredDonations = donations.filter((d) => !search || d.title.toLowerCase().includes(q) || d.organization.toLowerCase().includes(q));
  const filteredJobs = jobs.filter((j) => !search || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q));

  const totalResults =
    contentType === "all"
      ? filteredStartups.length + filteredFunding.length + filteredProjects.length + filteredDonations.length + filteredJobs.length
      : contentType === "startups" ? filteredStartups.length
      : contentType === "funding" ? filteredFunding.length
      : contentType === "projects" ? filteredProjects.length
      : contentType === "donations" ? filteredDonations.length
      : filteredJobs.length;

  const hasFilters = search || stage !== "All" || region !== "All" || verifiedOnly;

  const clearFilters = () => {
    setSearch("");
    setStage("All");
    setRegion("All");
    setVerifiedOnly(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">

        {/* â”€â”€ HERO SEARCH BLOCK (not sticky â€” flows naturally with page) â”€â”€ */}
        <div className="bg-gradient-to-br from-slate-950 via-[#0A1628] to-slate-900 pt-24 pb-10">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center mb-6">
              <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">Universal Search</Badge>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">Explore the Ecosystem</h1>
              <p className="text-white/50 text-sm">Search startups, funding, projects, jobs and more</p>
            </motion.div>

            {/* Search input */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                placeholder="Search startups, projects, jobs, fundingâ€¦"
                className="pl-12 h-13 text-base rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40 shadow-sm focus:bg-white/15 focus:border-primary/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-explore-search"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* â”€â”€ FILTER BAR (below hero, normal flow) â”€â”€ */}
        <div className="border-b border-border bg-background py-4 shadow-sm">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Type tabs */}
              <div className="flex flex-wrap gap-2">
                {contentTypes.map((ct) => (
                  <Button
                    key={ct.value}
                    variant={contentType === ct.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContentType(ct.value)}
                    data-testid={`filter-type-${ct.value}`}
                  >
                    {ct.label}
                  </Button>
                ))}
              </div>

              {/* Right filters */}
              <div className="flex flex-wrap items-center gap-3">
                <Select value={stage} onValueChange={setStage}>
                  <SelectTrigger className="w-36 h-8 text-sm" data-testid="select-explore-stage">
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {["All", "Pre-Seed", "Seed", "Series A"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="w-36 h-8 text-sm" data-testid="select-explore-region">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {["All", "Kolkata", "Siliguri", "Coochbehar"].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <Checkbox id="verified" checked={verifiedOnly} onCheckedChange={(v) => setVerifiedOnly(!!v)} data-testid="checkbox-verified" />
                  <Label htmlFor="verified" className="text-sm cursor-pointer">Verified only</Label>
                </div>

                <div className="flex items-center gap-1 border border-border rounded-lg p-0.5">
                  <button onClick={() => setView("grid")} className={`p-1.5 rounded-md transition-colors ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`} data-testid="button-view-grid">
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setView("list")} className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`} data-testid="button-view-list">
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-muted-foreground">
                    <X className="w-3.5 h-3.5" /> Clear
                  </Button>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-3">
              <span className="font-semibold text-foreground">{totalResults}</span> results
              {search && <> for "<span className="font-medium">{search}</span>"</>}
            </p>
          </div>
        </div>

        {/* â”€â”€ RESULTS â”€â”€ */}
        <div className="container mx-auto px-4 lg:px-8 py-10 space-y-12">
          {/* Startups */}
          {(contentType === "all" || contentType === "startups") && filteredStartups.length > 0 && (
            <section>
              {contentType === "all" && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Startups</h2>
                  <Link href="/startups"><Button variant="ghost" size="sm">View all</Button></Link>
                </div>
              )}
              <div className={view === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" : "space-y-3"}>
                {(contentType === "all" ? filteredStartups.slice(0, 4) : filteredStartups).map((s, i) => (
                  <StartupCard key={s.id} startup={s} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Funding */}
          {(contentType === "all" || contentType === "funding") && filteredFunding.length > 0 && (
            <section>
              {contentType === "all" && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Funding Opportunities</h2>
                  <Link href="/funding"><Button variant="ghost" size="sm">View all</Button></Link>
                </div>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(contentType === "all" ? filteredFunding.slice(0, 3) : filteredFunding).map((f, i) => (
                  <FundingCard key={f.id} funding={f} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {(contentType === "all" || contentType === "projects") && filteredProjects.length > 0 && (
            <section>
              {contentType === "all" && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Research Projects</h2>
                  <Link href="/projects"><Button variant="ghost" size="sm">View all</Button></Link>
                </div>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(contentType === "all" ? filteredProjects.slice(0, 3) : filteredProjects).map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Donations */}
          {(contentType === "all" || contentType === "donations") && filteredDonations.length > 0 && (
            <section>
              {contentType === "all" && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Donation Campaigns</h2>
                  <Link href="/donations"><Button variant="ghost" size="sm">View all</Button></Link>
                </div>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(contentType === "all" ? filteredDonations.slice(0, 3) : filteredDonations).map((d, i) => (
                  <DonationCard key={d.id} donation={d} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Jobs */}
          {(contentType === "all" || contentType === "jobs") && filteredJobs.length > 0 && (
            <section>
              {contentType === "all" && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Jobs</h2>
                  <Link href="/jobs"><Button variant="ghost" size="sm">View all</Button></Link>
                </div>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(contentType === "all" ? filteredJobs.slice(0, 3) : filteredJobs).map((j, i) => (
                  <JobCard key={j.id} job={j} index={i} />
                ))}
              </div>
            </section>
          )}

          {totalResults === 0 && (
            <div className="text-center py-24">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground">No results found</h3>
              <p className="text-muted-foreground mt-2">Try a different search term or clear filters</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}

