import React from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-foreground text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-8xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <span className="font-bold text-2xl text-white tracking-tight">JCIC</span>
            <p className="text-sm text-slate-400">
              The institutional innovation discovery platform connecting startups, investors, researchers, and students in West Bengal.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="hover:text-white transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><FaLinkedinIn size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><FaYoutube size={20} /></a>
            </div>
            {/* Source code download */}
            <a
              href="/jcic-source-code.tar.gz"
              download="jcic-source-code.tar.gz"
              className="inline-flex items-center gap-2 mt-1 text-xs text-slate-400 hover:text-primary transition-colors border border-slate-700 hover:border-primary/50 rounded-lg px-3 py-2 w-fit"
            >
              <Download size={14} />
              Download Source Code
            </a>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/explore" className="hover:text-primary transition-colors">Explore</Link></li>
              <li><Link href="/startups" className="hover:text-primary transition-colors">Startups</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/funding" className="hover:text-primary transition-colors">Funding</Link></li>
              <li><Link href="/jobs" className="hover:text-primary transition-colors">Jobs & Internships</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Ecosystem</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About JCIC</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Submit Startup</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Become a Mentor</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Partner With Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">Get the latest news from the West Bengal innovation ecosystem.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:border-primary text-white"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>Â© 2025 JCIC Innovation Ecosystem Platform. All rights reserved.</p>
          <p>Developed by Sohel Rahaman</p>
        </div>
      </div>
    </footer>
  );
}

