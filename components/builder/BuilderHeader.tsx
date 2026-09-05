"use client";

import { useState } from "react";
import { Terminal, Eye, Download, Menu, Loader2, RotateCcw, Undo2, Redo2 } from "lucide-react";
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
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
}

export default function BuilderHeader({
  onToggleMobileTab,
  activeTab,
  data,
  sectionOrder,
  onReset,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
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
      <div className="flex h-14 items-center justify-between px-2 sm:px-4 md:px-6 gap-1 sm:gap-4 max-w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0" title="Resumate Home">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/30">
            <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
          </div>
          <span className="font-bold text-zinc-100 text-sm tracking-tight hidden sm:block">
            Resumate
          </span>
        </Link>

        {/* Center tagline */}
        <p className="hidden md:block text-xs text-zinc-500 font-medium tracking-wide truncate">
          Build your professional resume in minutes
        </p>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Mobile tab toggle */}
          <div className="flex md:hidden rounded-lg border border-zinc-800 bg-zinc-900 p-0.5 gap-0.5">
            <button
              type="button"
              onClick={() => onToggleMobileTab?.("sections")}
              className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                activeTab === "sections"
                  ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/30"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Menu className="h-3 w-3" />
              <span className="sm:hidden">Edit</span>
              <span className="hidden sm:inline">Sections</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleMobileTab?.("preview")}
              className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/30"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Eye className="h-3 w-3" />
              <span>Preview</span>
            </button>
          </div>

          {/* Undo & Redo Controls */}
          {(onUndo || onRedo) && (
            <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900/60 p-0.5 shadow-sm">
              <button
                type="button"
                onClick={onUndo}
                disabled={!canUndo}
                className="p-1 sm:p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-400 disabled:cursor-not-allowed cursor-pointer"
                title="Undo (Ctrl+Z)"
                aria-label="Undo"
              >
                <Undo2 className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
              </button>
              <div className="w-[1px] h-3 bg-zinc-800 mx-0.5" />
              <button
                type="button"
                onClick={onRedo}
                disabled={!canRedo}
                className="p-1 sm:p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-400 disabled:cursor-not-allowed cursor-pointer"
                title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
                aria-label="Redo"
              >
                <Redo2 className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
              </button>
            </div>
          )}

          {/* Reset Button */}
          {onReset && (
            <button
              type="button"
              onClick={() => setResetModalOpen(true)}
              className="flex items-center justify-center gap-1 border border-zinc-800 bg-zinc-900/60 hover:bg-rose-500/10 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 text-xs h-7 sm:h-8 w-7 sm:w-auto px-0 sm:px-2.5 rounded-lg transition-all cursor-pointer"
              title="Reset resume to default demo data"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          {/* Download PDF */}
          <Button
            size="sm"
            onClick={handleDownload}
            disabled={isDownloading || !data}
            className="flex items-center gap-1 sm:gap-1.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs h-7 sm:h-8 px-2 sm:px-3 shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-95 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed flex-shrink-0 font-medium"
          >
            {isDownloading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            <span className="sm:hidden">
              {isDownloading ? "..." : "PDF"}
            </span>
            <span className="hidden sm:inline">
              {isDownloading ? "Generating..." : "Download PDF"}
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
