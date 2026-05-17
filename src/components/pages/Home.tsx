import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { StartupCard } from "@/components/cards/StartupCard";
import { FundingCard } from "@/components/cards/FundingCard";
import { JobCard } from "@/components/cards/JobCard";
import { startups } from "@/data/startups";
import { funding } from "@/data/funding";
import { jobs } from "@/data/jobs";
import { internships } from "@/data/internships";
import { projects } from "@/data/projects";
import { ecosystemActivity, categories, ecosystemStats } from "@/data/ecosystem";
import {
  Rocket, ArrowRight, CheckCircle2, TrendingUp, Zap, Brain, Heart, Leaf, Cpu, BookOpen, Recycle, DollarSign, Factory, Shield, ShoppingBag, Microscope, Building2, Users, MapPin, Activity, Star
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Brain, Heart, Leaf, Cpu, BookOpen, Recycle, DollarSign, Factory, Shield, ShoppingBag, Zap, Microscope, Building2, Users, MapPin, TrendingUp, Activity
};

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
      },
    });
    return controls.stop;
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const floatingCards = [
  { name: "AgroVista AI", status: "Verified", raised: "â‚¹45L Raised", color: "from-green-500/20 to-emerald-500/20", border: "border-green-200" },
  { name: "MedLink Pro", status: "Seed Stage", raised: "â‚¹1.2Cr Raised", color: "from-blue-500/20 to-indigo-500/20", border: "border-blue-200" },
  { name: "EduReach", status: "Series A", raised: "â‚¹8Cr Raised", color: "from-violet-500/20 to-purple-500/20", border: "border-violet-200" },
];

const trustBadges = [
  { icon: CheckCircle2, label: "Govt. Backed", sub: "WB Innovation Fund" },
  { icon: Building2, label: "248+ Startups", sub: "Verified Ecosystem" },
  { icon: Users, label: "64 Investors", sub: "Active Network" },
  { icon: TrendingUp, label: "â‚¹42Cr Deployed", sub: "Funding Facilitated" },
  { icon: Star, label: "128 Mentors", sub: "Domain Experts" },
];

export default function Home() {
  return (
    <PageTransition>
      <div className="w-full">
        {/* HERO */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#0A1628] to-slate-900 pt-16">
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl opacity-40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

          <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div className="text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-1.5 text-sm gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    West Bengal's Premier Innovation Ecosystem
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Discover Verified{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">
                    Startups
                  </span>{" "}
                  &amp; Innovations
                </motion.h1>

                <motion.p
                  className="mt-6 text-lg text-white/60 max-w-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Connecting innovators, investors, students and institutions into one trusted ecosystem. The institutional platform for Bengal's startup renaissance.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link href="/explore">
                    <Button size="lg" className="gap-2 px-8 h-12 text-base" data-testid="button-explore-ecosystem">
                      Explore Ecosystem
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/startups">
                    <Button size="lg" variant="outline" className="gap-2 px-8 h-12 text-base bg-white/5 border-white/20 text-white hover:bg-white/10" data-testid="button-submit-startup">
                      <Rocket className="w-4 h-4" />
                      Submit Startup
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {[
                    { label: "Startups", value: "248+" },
                    { label: "Funding Deployed", value: "â‚¹42Cr" },
                    { label: "Cities", value: "12" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-white/50">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right â€” floating cards */}
              <div className="hidden lg:block relative h-[480px]">
                {floatingCards.map((card, i) => (
                  <motion.div
                    key={card.name}
                    className={`absolute bg-gradient-to-br ${card.color} backdrop-blur-sm border ${card.border} rounded-2xl p-4 shadow-xl`}
                    style={{
                      top: `${i * 28}%`,
                      right: i % 2 === 0 ? "0%" : "15%",
                      width: 220,
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                        <Rocket className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-white text-sm font-semibold">{card.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-500/30 text-green-300 border-green-400/30 text-xs">{card.status}</Badge>
                      <span className="text-white/80 text-xs font-medium">{card.raised}</span>
                    </div>
                  </motion.div>
                ))}
                {/* Connecting lines decoration */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full opacity-10" viewBox="0 0 400 480">
                    <line x1="220" y1="60" x2="300" y2="195" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="300" y1="195" x2="185" y2="330" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="220" cy="60" r="3" fill="white" />
                    <circle cx="300" cy="195" r="3" fill="white" />
                    <circle cx="185" cy="330" r="3" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="py-5 bg-white border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.label} className="flex items-center gap-2.5 text-center">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">{badge.label}</p>
                      <p className="text-xs text-muted-foreground">{badge.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TRENDING DISCOVERY */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold text-foreground">Discover the Ecosystem</h2>
              <p className="text-muted-foreground mt-2">Explore what's happening across startups, funding, and opportunities</p>
            </motion.div>
            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="flex-wrap h-auto gap-1 mb-8 bg-secondary p-1 rounded-xl">
                <TabsTrigger value="trending" className="rounded-lg">Trending</TabsTrigger>
                <TabsTrigger value="funded" className="rounded-lg">Recently Funded</TabsTrigger>
                <TabsTrigger value="hiring" className="rounded-lg">Hiring Now</TabsTrigger>
                <TabsTrigger value="internships" className="rounded-lg">Internships</TabsTrigger>
                <TabsTrigger value="projects" className="rounded-lg">Research Projects</TabsTrigger>
              </TabsList>
              <TabsContent value="trending">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {startups.slice(0, 4).map((s, i) => <StartupCard key={s.id} startup={s} index={i} />)}
                </div>
              </TabsContent>
              <TabsContent value="funded">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {startups.filter(s => s.stage === "Seed" || s.stage === "Series A").slice(0, 4).map((s, i) => <StartupCard key={s.id} startup={s} index={i} />)}
                </div>
              </TabsContent>
              <TabsContent value="hiring">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobs.slice(0, 6).map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
                </div>
              </TabsContent>
              <TabsContent value="internships">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {internships.slice(0, 6).map((intern, i) => (
                    <JobCard key={intern.id} job={{ ...intern, type: "Internship", category: intern.category, salary: intern.stipend, experience: intern.duration, deadline: intern.deadline }} index={i} isInternship internshipData={{ duration: intern.duration, stipend: intern.stipend }} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="projects">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.slice(0, 3).map((p, i) => (
                    <div key={p.id} className="bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200">
                      <img src={p.coverImage} alt={p.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">{p.category}</Badge>
                        <h3 className="font-semibold text-sm text-foreground line-clamp-2">{p.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{p.institution}</p>
                        <div className="flex items-center justify-between mt-3">
                          <Badge variant="outline" className="text-xs">{p.status}</Badge>
                          <span className="text-xs font-medium text-primary">{p.funding}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CATEGORY EXPLORER */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold text-foreground">Explore by Category</h2>
              <p className="text-muted-foreground mt-2">Filter the ecosystem by industry sector</p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categories.map((cat, i) => {
                const Icon = iconMap[cat.icon] || Brain;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ y: -3, scale: 1.03 }}
                  >
                    <Link href={`/explore?category=${cat.id}`}>
                      <div className="bg-card border border-card-border rounded-xl p-4 text-center hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer group" data-testid={`category-${cat.id}`}>
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-xs font-semibold text-foreground">{cat.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{cat.count} entries</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURED STARTUPS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <h2 className="text-3xl font-bold text-foreground">Featured Startups</h2>
                <p className="text-muted-foreground mt-1">Hand-picked by the JCIC editorial team</p>
              </div>
              <Link href="/startups">
                <Button variant="outline" className="gap-2">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {startups.slice(0, 4).map((s, i) => <StartupCard key={s.id} startup={s} index={i} />)}
            </div>
          </div>
        </section>

        {/* FUNDING SECTION (dark) */}
        <section className="py-20 bg-gradient-to-br from-slate-950 via-[#0A1628] to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">Funding Opportunities</Badge>
                <h2 className="text-3xl font-bold text-white">Capital for Innovators</h2>
                <p className="text-white/50 mt-1">Grants, equity, and debt â€” matched to your stage</p>
              </div>
              <Link href="/funding">
                <Button variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {funding.slice(0, 3).map((f, i) => <FundingCard key={f.id} funding={f} dark index={i} />)}
            </div>
          </div>
        </section>

        {/* JOBS TIMELINE */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <h2 className="text-3xl font-bold text-foreground">Latest Opportunities</h2>
                <p className="text-muted-foreground mt-1">Jobs and internships from verified startups</p>
              </div>
              <div className="flex gap-2">
                <Link href="/jobs"><Button variant="outline" size="sm">Jobs</Button></Link>
                <Link href="/internships"><Button variant="outline" size="sm">Internships</Button></Link>
              </div>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-4">
              {jobs.slice(0, 4).map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
            </div>
          </div>
        </section>

        {/* ECOSYSTEM MAP */}
        <section className="py-24 bg-gradient-to-br from-slate-950 via-[#0A1628] to-slate-900 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          </div>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-4"
            >
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Regional Coverage</Badge>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white">Innovation Hubs Across Bengal</h2>
              <p className="text-white/50 mt-3 max-w-xl mx-auto">From metro Kolkata to the foothills of Darjeeling â€” JCIC maps and amplifies every innovation cluster in the state.</p>
            </motion.div>

            {/* Total stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10 mb-12"
            >
              {[
                { label: "Cities Covered", value: "12+" },
                { label: "Total Startups", value: "248+" },
                { label: "Total Funding", value: "â‚¹42Cr" },
                { label: "Active Mentors", value: "128" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Hub cards â€” 2 rows: 3 top, 3 bottom */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                {
                  city: "Kolkata", tag: "Metro Hub", startups: 142, funding: "â‚¹28Cr", jobs: 94, mentors: 62,
                  sectors: ["AI & ML", "FinTech", "EdTech", "HealthTech"],
                  gradient: "from-blue-600/25 to-primary/20", border: "border-blue-400/20", dot: "bg-blue-400",
                  share: 57,
                },
                {
                  city: "Siliguri", tag: "North Bengal Hub", startups: 64, funding: "â‚¹9Cr", jobs: 38, mentors: 28,
                  sectors: ["AgriTech", "HealthTech", "Logistics"],
                  gradient: "from-emerald-600/25 to-teal-500/20", border: "border-emerald-400/20", dot: "bg-emerald-400",
                  share: 26,
                },
                {
                  city: "Durgapur", tag: "Industrial Hub", startups: 31, funding: "â‚¹3.5Cr", jobs: 24, mentors: 18,
                  sectors: ["Manufacturing", "Robotics", "CleanTech"],
                  gradient: "from-orange-600/25 to-amber-500/20", border: "border-orange-400/20", dot: "bg-orange-400",
                  share: 12,
                },
                {
                  city: "Coochbehar", tag: "Emerging Hub", startups: 42, funding: "â‚¹5Cr", jobs: 19, mentors: 12,
                  sectors: ["Handicrafts", "EdTech", "Rural-Tech"],
                  gradient: "from-violet-600/25 to-purple-500/20", border: "border-violet-400/20", dot: "bg-violet-400",
                  share: 17,
                },
                {
                  city: "Howrah", tag: "Manufacturing Belt", startups: 18, funding: "â‚¹2Cr", jobs: 14, mentors: 8,
                  sectors: ["FinTech", "MSME-Tech", "Logistics"],
                  gradient: "from-rose-600/25 to-pink-500/20", border: "border-rose-400/20", dot: "bg-rose-400",
                  share: 7,
                },
                {
                  city: "Darjeeling", tag: "Tourism & Agri Hub", startups: 11, funding: "â‚¹1.2Cr", jobs: 9, mentors: 6,
                  sectors: ["AgriTech", "Tourism-Tech", "Handicrafts"],
                  gradient: "from-sky-600/25 to-cyan-500/20", border: "border-sky-400/20", dot: "bg-sky-400",
                  share: 5,
                },
              ].map((hub, i) => (
                <motion.div
                  key={hub.city}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="cursor-default"
                >
                  <div className={`bg-gradient-to-br ${hub.gradient} border ${hub.border} rounded-2xl p-5 h-full`}>
                    {/* City header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${hub.dot} shadow-lg`} />
                        <div>
                          <h3 className="text-lg font-bold text-white">{hub.city}</h3>
                          <p className="text-xs text-white/50">{hub.tag}</p>
                        </div>
                      </div>
                      <Badge className="text-xs bg-white/10 text-white/70 border-white/10">{hub.share}% of ecosystem</Badge>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: "Startups", val: hub.startups },
                        { label: "Funding", val: hub.funding },
                        { label: "Jobs", val: hub.jobs },
                      ].map((s) => (
                        <div key={s.label} className="bg-white/8 rounded-xl p-2.5 text-center">
                          <p className="text-base font-bold text-white leading-tight">{s.val}</p>
                          <p className="text-[10px] text-white/50 mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] text-white/40 mb-1">
                        <span>Ecosystem share</span>
                        <span>{hub.share}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${hub.dot} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${hub.share}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Sector tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {hub.sectors.map((s) => (
                        <span key={s} className="text-[10px] bg-white/10 text-white/70 border border-white/10 rounded-md px-2 py-0.5">{s}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-10"
            >
              <Link href="/explore">
                <Button variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10">
                  Explore All Regions <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* LIVE ACTIVITY FEED */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <Badge variant="outline" className="mb-3 gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live Activity
              </Badge>
              <h2 className="text-3xl font-bold text-foreground">Ecosystem in Motion</h2>
              <p className="text-muted-foreground mt-2">Real-time updates from across the platform</p>
            </motion.div>
            <div className="max-w-2xl mx-auto space-y-3">
              {ecosystemActivity.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4 border border-border"
                >
                  <Avatar className="w-9 h-9 flex-shrink-0">
                    <AvatarImage src={item.avatar} alt="" />
                    <AvatarFallback>J</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{item.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{item.timeAgo}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ECOSYSTEM STATS */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {ecosystemStats.map((stat, i) => {
                const Icon = iconMap[stat.icon] || Activity;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="text-center"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-6 bg-white/20 text-white border-white/30">Join 248+ Innovators</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
                Ready to Join West Bengal's Innovation Ecosystem?
              </h2>
              <p className="mt-4 text-xl text-white/70 max-w-2xl mx-auto">
                Whether you're a founder, investor, student, or researcher â€” there's a place for you in JCIC.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-10">
                <Link href="/startups">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8 h-12 text-base font-semibold" data-testid="button-cta-submit">
                    <Rocket className="w-4 h-4" />
                    Submit Your Startup
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 px-8 h-12 text-base" data-testid="button-cta-explore">
                    Explore Opportunities
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}

