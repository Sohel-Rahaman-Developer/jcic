import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Calendar, Heart } from "lucide-react";

interface DonationCardProps {
  donation: {
    id: string;
    title: string;
    description: string;
    organization: string;
    goal: string;
    raised: string;
    goalNum: number;
    raisedNum: number;
    donors: number;
    category: string;
    deadline: string;
    tags: string[];
    coverImage: string;
    logo: string;
    impact: string;
  };
  index?: number;
}

export function DonationCard({ donation, index = 0 }: DonationCardProps) {
  const progress = Math.round((donation.raisedNum / donation.goalNum) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3 }}
    >
      <Link href={`/donations/${donation.id}`}>
        <div
          className="bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer h-full flex flex-col"
          data-testid={`card-donation-${donation.id}`}
        >
          <div className="relative h-40 overflow-hidden">
            <img src={donation.coverImage} alt={donation.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
            <Badge className="absolute top-3 left-3 bg-rose-500 text-white border-0 text-xs gap-1">
              <Heart className="w-3 h-3" />
              {donation.category}
            </Badge>
          </div>
          <div className="p-4 flex flex-col flex-1 gap-3">
            <div>
              <h3 className="font-semibold text-foreground text-sm leading-tight">{donation.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{donation.organization}</p>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{donation.description}</p>
            <div className="mt-auto space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">{donation.raised} raised</span>
                <span className="text-muted-foreground">of {donation.goal}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {donation.donors} donors
                </span>
                <span>{progress}% funded</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

