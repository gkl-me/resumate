"use client";

import { useState } from "react";
import { Terminal, Eye, Download, Menu, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ResumeDataType } from "@/app/data/data";
import ResetConfirmModal from "./ResetConfirmModal";

interface BuilderHeaderProps {
  onToggleMobileTab?: (tab: "sections" | "preview") => void;
  activeTab?: "sections" | "preview";
  data?: ResumeDataType;
  sectionOrder?: string[];
  onReset?: () => void;
}

export default function BuilderHeader({
  onToggleMobileTab,
  activeTab,
  data,
  sectionOrder,
  onReset,
}: BuilderHeaderProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleDownload = async () => {
    if (!data || isDownloading) return;
    setIsDownloading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { ResumePdfDocumnet } = await import(
        "@/components/pdf/ResumePdfDocument"
      );
      const blob = await pdf(
        <ResumePdfDocumnet data={data} sectionOrder={sectionOrder} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const rawName = data.profile?.name?.trim() || "Resume";
      const fileName = `${rawName.replace(/\s+/g, "_")}_Resume.pdf`;
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setIsDownloading(false);
    }
  };

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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === "sections"
                  ? "bg-indigo-500 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Menu className="h-3 w-3" />
              Sections
            </button>
            <button
              onClick={() => onToggleMobileTab?.("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === "preview"
                  ? "bg-indigo-500 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Eye className="h-3 w-3" />
              Preview
            </button>
          </div>

          {/* Reset Button */}
          {onReset && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setResetModalOpen(true)}
              className="flex items-center gap-1.5 border-zinc-800 bg-zinc-900/60 hover:bg-rose-500/10 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 text-xs h-8 px-2.5 sm:px-3 transition-all cursor-pointer"
              title="Reset resume to default demo data"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          )}

          {/* Download PDF */}
          <Button
            size="sm"
            onClick={handleDownload}
            disabled={isDownloading || !data}
            className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs h-8 shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-95 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {isDownloading ? "Generating..." : "Download PDF"}
            </span>
            <span className="sm:hidden">
              {isDownloading ? "..." : "PDF"}
            </span>
          </Button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {onReset && (
        <ResetConfirmModal
          open={resetModalOpen}
          onClose={() => setResetModalOpen(false)}
          onConfirm={onReset}
        />
      )}
    </header>
  );
}
