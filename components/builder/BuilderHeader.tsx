"use client";

import { Terminal, Eye, Download, Menu, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BuilderHeaderProps {
  onToggleMobileTab?: (tab: "sections" | "preview") => void;
  activeTab?: "sections" | "preview";
}

export default function BuilderHeader({
  onToggleMobileTab,
  activeTab,
}: BuilderHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/30">
            <Terminal className="h-4 w-4 text-indigo-400" />
          </div>
          <span className="font-bold text-zinc-100 text-sm tracking-tight hidden sm:block">
            Resumate
          </span>
        </Link>

        {/* Center tagline */}
        <p className="hidden md:block text-xs text-zinc-500 font-medium tracking-wide">
          Build your professional resume in minutes
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile tab toggle */}
          <div className="flex md:hidden rounded-lg border border-zinc-800 bg-zinc-900 p-0.5 gap-0.5">
            <button
              onClick={() => onToggleMobileTab?.("sections")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === "sections"
                ? "bg-indigo-500 text-white"
                : "text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <Menu className="h-3 w-3" />
              Sections
            </button>
            <button
              onClick={() => onToggleMobileTab?.("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === "preview"
                ? "bg-indigo-500 text-white"
                : "text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <Eye className="h-3 w-3" />
              Preview
            </button>
          </div>

          {/* Download PDF */}
          <Button
            size="sm"
            className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs h-8 shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-95"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
