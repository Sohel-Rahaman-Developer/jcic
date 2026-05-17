import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div className="text-[160px] lg:text-[200px] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary via-blue-400 to-indigo-600 select-none">
                404
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 -mt-4"
            >
              <h1 className="text-3xl font-bold text-foreground">Page Not Found</h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                The innovation you're looking for doesn't live here. But West Bengal's startup ecosystem is alive and well.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <Link href="/">
                  <Button size="lg" className="gap-2" data-testid="button-go-home">
                    <Home className="w-4 h-4" />
                    Go Home
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline" className="gap-2" data-testid="button-explore-from-404">
                    <Compass className="w-4 h-4" />
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="flex justify-center gap-2 mt-16">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/30"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}

