import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { projects } from "@/data/projects";
import { ArrowLeft, Building2, Users, CheckCircle2, Bookmark, Share2 } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Project not found</h2>
          <Link href="/projects"><Button className="mt-4">Back to Projects</Button></Link>
        </div>
      </div>
    );
  }

  const statusColor = project.status === "Active" ? "bg-green-100 text-green-700 border-green-200"
    : project.status === "Seeking Collaborators" ? "bg-blue-100 text-blue-700 border-blue-200"
    : "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="relative h-56 lg:h-72 overflow-hidden">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <Link href="/projects" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white">{project.title}</h1>
            <p className="text-white/70 mt-1">{project.institution}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="bg-card border border-card-border rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 rounded-xl">
                      <AvatarImage src={project.leadAvatar} alt={project.lead} />
                      <AvatarFallback className="rounded-xl">{project.lead[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{project.lead}</p>
                      <p className="text-xs text-muted-foreground">Principal Investigator</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span>{project.institution}</span>
                  </div>
                  <div className="space-y-2">
                    <Badge className={statusColor}>{project.status}</Badge>
                    <Badge variant="secondary" className="ml-2">{project.category}</Badge>
                    {project.verified && <Badge className="ml-2 bg-green-100 text-green-700 border-green-200 gap-1"><CheckCircle2 className="w-3 h-3" />Verified</Badge>}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Funding</p>
                    <p className="font-semibold text-foreground">{project.funding}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5"><Bookmark className="w-3.5 h-3.5" />Save</Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5"><Share2 className="w-3.5 h-3.5" />Share</Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-5 text-white space-y-3">
                  <h3 className="font-bold text-lg">Collaborate on This Project</h3>
                  <Button className="w-full bg-white text-indigo-600 hover:bg-white/90 font-semibold" data-testid="button-express-interest-project">Express Interest</Button>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" data-testid="button-contact-researcher">Contact Researcher</Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 order-1 lg:order-2 space-y-8">
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-bold text-foreground mb-3">About This Project</h2>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </motion.section>

              {project.collaborators && project.collaborators.length > 0 && (
                <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-xl font-bold text-foreground mb-4">Collaborating Organizations</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.collaborators.map((col, i) => (
                      <div key={i} className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-2.5">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{col}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}

