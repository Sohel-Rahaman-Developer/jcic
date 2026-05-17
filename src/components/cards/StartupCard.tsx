import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MapPin, Users, CheckCircle2, TrendingUp } from "lucide-react";

interface StartupCardProps {
  startup: {
    id: string;
    name: string;
    tagline: string;
    logo: string;
    coverImage: string;
    founder: string;
    founderAvatar: string;
    location: string;
    stage: string;
    industry: string;
    fundingRaised: string;
    fundingGoal: string;
    fundingRaisedNum: number;
    fundingGoalNum: number;
    tags: string[];
    verified: boolean;
    employees: number;
    metrics?: { users: string; revenue: string; growth: string };
  };
  index?: number;
}

export function StartupCard({ startup, index = 0 }: StartupCardProps) {
  const progress = Math.round((startup.fundingRaisedNum / startup.fundingGoalNum) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={`/startups/${startup.id}`}>
        <div
          className="bg-card border border-card-border rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 group-hover:shadow-lg group-hover:border-primary/30 h-full flex flex-col"
          data-testid={`card-startup-${startup.id}`}
        >
          <div className="relative h-44 overflow-hidden">
            <img
              src={startup.coverImage}
              alt={startup.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <Avatar className="w-9 h-9 border-2 border-white shadow-md">
                <AvatarImage src={startup.logo} alt={startup.name} />
                <AvatarFallback>{startup.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            {startup.verified && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-green-500 text-white border-0 text-xs gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </Badge>
              </div>
            )}
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="text-xs bg-white/90 text-foreground">
                {startup.stage}
              </Badge>
            </div>
          </div>

          <div className="p-4 flex flex-col flex-1 gap-3">
            <div>
              <h3 className="font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                {startup.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{startup.tagline}</p>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {startup.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {startup.employees} team
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {startup.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
              <Badge variant="secondary" className="text-xs px-2 py-0.5 text-primary">
                {startup.industry}
              </Badge>
            </div>

            <div className="mt-auto pt-2 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span className="flex items-center gap-1 font-medium text-foreground">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  {startup.fundingRaised}
                </span>
                <span>Goal: {startup.fundingGoal}</span>
              </div>
              <Progress value={progress} className="h-1.5" />
              <p className="text-xs text-muted-foreground mt-1">{progress}% funded</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

