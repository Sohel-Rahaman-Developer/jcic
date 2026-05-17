import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, DollarSign, CheckCircle2 } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    category: string;
    salary: string;
    experience: string;
    deadline: string;
    tags: string[];
    logo: string;
    verified: boolean;
    posted: string;
  };
  index?: number;
  isInternship?: boolean;
  internshipData?: {
    duration: string;
    stipend: string;
  };
}

export function JobCard({ job, index = 0, isInternship = false, internshipData }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -2 }}
    >
      <div
        className="bg-card border border-card-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer"
        data-testid={`card-job-${job.id}`}
      >
        <div className="flex items-start gap-3">
          <Avatar className="w-11 h-11 rounded-xl border border-border flex-shrink-0">
            <AvatarImage src={job.logo} alt={job.company} />
            <AvatarFallback className="rounded-xl">{job.company[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground text-sm leading-tight">{job.title}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  {job.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  )}
                </div>
              </div>
              <Badge variant="outline" className="text-xs flex-shrink-0">
                {job.type}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
              {isInternship && internshipData ? (
                <>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {internshipData.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {internshipData.stipend}
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {job.salary}
                  </span>
                  <span>{job.experience}</span>
                </>
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex flex-wrap gap-1.5">
                {job.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">{job.posted}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

