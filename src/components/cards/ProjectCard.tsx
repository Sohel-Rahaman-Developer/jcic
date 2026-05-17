import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, CheckCircle2, Users } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    institution: string;
    lead: string;
    leadAvatar: string;
    category: string;
    status: string;
    collaborators: string[];
    funding: string;
    tags: string[];
    coverImage: string;
    logo: string;
    verified: boolean;
  };
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const statusColor =
    project.status === "Active"
      ? "bg-green-100 text-green-700"
      : project.status === "Seeking Collaborators"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3 }}
    >
      <Link href={`/projects/${project.id}`}>
        <div
          className="bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer h-full flex flex-col"
          data-testid={`card-project-${project.id}`}
        >
          <div className="relative h-36 overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
            {project.verified && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-green-500 text-white border-0 text-xs gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </Badge>
              </div>
            )}
          </div>
          <div className="p-4 flex flex-col flex-1 gap-3">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <Building2 className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <p className="text-xs text-muted-foreground">{project.institution}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor}`}>
                {project.status}
              </span>
              <span className="text-xs text-muted-foreground font-medium">{project.funding}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

