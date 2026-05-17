import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, TrendingUp, ArrowRight } from "lucide-react";

interface FundingCardProps {
  funding: {
    id: string;
    title: string;
    description: string;
    organization: string;
    amount: string;
    equity: string;
    stage: string;
    deadline: string;
    category: string;
    applicants: number;
    status: string;
    tags: string[];
    coverImage: string;
    logo: string;
  };
  dark?: boolean;
  index?: number;
}

export function FundingCard({ funding, dark = false, index = 0 }: FundingCardProps) {
  const statusColor = funding.status === "Open" ? "bg-green-500" : funding.status === "Closing Soon" ? "bg-amber-500" : "bg-gray-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -3 }}
    >
      <Link href={`/funding/${funding.id}`}>
        <div
          className={`rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer h-full flex flex-col hover:shadow-lg ${
            dark
              ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              : "bg-card border-card-border hover:border-primary/30"
          }`}
          data-testid={`card-funding-${funding.id}`}
        >
          <div className="p-5 flex-1 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${statusColor}`} />
                  <span className={`text-xs font-medium ${dark ? "text-white/60" : "text-muted-foreground"}`}>
                    {funding.status}
                  </span>
                </div>
                <h3 className={`font-semibold leading-tight ${dark ? "text-white" : "text-foreground"}`}>
                  {funding.title}
                </h3>
                <p className={`text-sm mt-1 ${dark ? "text-white/60" : "text-muted-foreground"}`}>
                  {funding.organization}
                </p>
              </div>
              <Badge
                variant={dark ? "outline" : "secondary"}
                className={`text-xs flex-shrink-0 ${dark ? "border-white/20 text-white/70" : ""}`}
              >
                {funding.stage}
              </Badge>
            </div>

            <p className={`text-sm line-clamp-2 ${dark ? "text-white/60" : "text-muted-foreground"}`}>
              {funding.description}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className={`rounded-xl p-3 ${dark ? "bg-white/5" : "bg-secondary"}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className={`w-3.5 h-3.5 ${dark ? "text-primary" : "text-primary"}`} />
                  <span className={`text-xs ${dark ? "text-white/50" : "text-muted-foreground"}`}>Amount</span>
                </div>
                <p className={`text-sm font-semibold ${dark ? "text-white" : "text-foreground"}`}>{funding.amount}</p>
              </div>
              <div className={`rounded-xl p-3 ${dark ? "bg-white/5" : "bg-secondary"}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`text-xs ${dark ? "text-white/50" : "text-muted-foreground"}`}>Equity</span>
                </div>
                <p className={`text-sm font-semibold ${dark ? "text-white" : "text-foreground"}`}>{funding.equity}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-2">
              <div className="flex items-center gap-3 text-xs">
                <span className={`flex items-center gap-1 ${dark ? "text-white/50" : "text-muted-foreground"}`}>
                  <Users className="w-3 h-3" />
                  {funding.applicants} applicants
                </span>
                <span className={`flex items-center gap-1 ${dark ? "text-white/50" : "text-muted-foreground"}`}>
                  <Calendar className="w-3 h-3" />
                  {new Date(funding.deadline).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                </span>
              </div>
              <ArrowRight className={`w-4 h-4 ${dark ? "text-primary" : "text-primary"}`} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

