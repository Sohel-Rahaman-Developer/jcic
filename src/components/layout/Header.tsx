import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocation } from "@/hooks/useLocation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ChevronDown, Rocket, Building2, FolderOpen, TrendingUp, Heart, Briefcase, GraduationCap, Info, Phone } from "lucide-react";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/startups", label: "Startups", icon: Building2 },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/funding", label: "Funding", icon: TrendingUp },
  { href: "/donations", label: "Donations", icon: Heart },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/internships", label: "Internships", icon: GraduationCap },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-xl text-foreground tracking-tight">
              JCIC
            </span>
            <Badge variant="secondary" className="text-xs hidden sm:inline-flex">Beta</Badge>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 7).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location === "/about"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              About
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm">Login</Button>
            <Button size="sm" className="gap-1.5">
              <Rocket className="w-3.5 h-3.5" />
              Join Ecosystem
            </Button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                      <Rocket className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-bold text-foreground">JCIC Platform</span>
                  </div>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          location === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-secondary"
                        }`}
                        data-testid={`link-mobile-${link.label.toLowerCase()}`}
                      >
                        {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="p-4 border-t border-border space-y-2">
                  <Button variant="outline" className="w-full">Login</Button>
                  <Button className="w-full gap-1.5">
                    <Rocket className="w-3.5 h-3.5" />
                    Join Ecosystem
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

