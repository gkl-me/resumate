"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  FileText,
  Download,
  Loader2,
  FileCheck2,
  ExternalLink,
} from "lucide-react";
import type { ResumeDataType } from "@/app/data/data";

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
  data?: ResumeDataType;
  sectionOrder?: string[];
}

export default function DownloadModal({
  open,
  onClose,
  data,
  sectionOrder,
}: DownloadModalProps) {
  const [downloadingType, setDownloadingType] = useState<"pdf" | "docx" | null>(
    null
  );

  const getCleanFileName = (ext: "pdf" | "docx") => {
    const rawName = data?.profile?.name?.trim() || "Resume";
    return `${rawName.replace(/\s+/g, "_")}_Resume.${ext}`;
  };

  const downloadBlob = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    if (!data || downloadingType) return;
    setDownloadingType("pdf");
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { ResumePdfDocument } = await import(
        "@/components/pdf/ResumePdfDocument"
      );
      const blob = await pdf(
        <ResumePdfDocument data={data} sectionOrder={sectionOrder} />
      ).toBlob();

      downloadBlob(blob, getCleanFileName("pdf"));
      onClose();
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setDownloadingType(null);
    }
  };

  const handleDownloadDocx = async () => {
    if (!data || downloadingType) return;
    setDownloadingType("docx");
    try {
      const { generateResumeDocx } = await import(
        "@/components/docx/ResumeDocxDocument"
      );
      const blob = await generateResumeDocx(data, sectionOrder);

      downloadBlob(blob, getCleanFileName("docx"));
      onClose();
    } catch (err) {
      console.error("Failed to generate DOCX:", err);
    } finally {
      setDownloadingType(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && !downloadingType && onClose()}>
      <DialogContent className="sm:max-w-md w-[calc(100vw-2rem)] p-4 sm:p-6 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl">
        <DialogHeader className="space-y-1.5 text-left">
          <DialogTitle className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Download className="h-5 w-5 text-indigo-400" />
            Download Resume
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-zinc-400">
            Choose your preferred format. Both formats share identical layout, typography, and margins.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-3 pt-2">
          {/* PDF Option Card */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={!data || downloadingType !== null}
            className="group relative flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border border-zinc-800/90 bg-zinc-900/60 hover:bg-zinc-850/80 hover:border-indigo-500/40 text-left transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:shadow-indigo-500/5 active:scale-[0.99]"
          >
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:scale-105 transition-transform flex-shrink-0">
              {downloadingType === "pdf" ? (
                <Loader2 className="h-5 w-5 animate-spin text-rose-400" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-zinc-100 group-hover:text-indigo-300 transition-colors">
                  PDF Document
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/25">
                  .pdf
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Standard format for job applications. Preserves vector graphics and exact formatting on all devices.
              </p>
            </div>
            <div className="self-center flex-shrink-0 text-zinc-500 group-hover:text-indigo-400 transition-colors">
              {downloadingType === "pdf" ? (
                <span className="text-xs text-rose-400 font-medium animate-pulse">Exporting...</span>
              ) : (
                <Download className="h-4 w-4" />
              )}
            </div>
          </button>

          {/* DOCX Option Card */}
          <button
            type="button"
            onClick={handleDownloadDocx}
            disabled={!data || downloadingType !== null}
            className="group relative flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border border-zinc-800/90 bg-zinc-900/60 hover:bg-zinc-850/80 hover:border-indigo-500/40 text-left transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:shadow-indigo-500/5 active:scale-[0.99]"
          >
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform flex-shrink-0">
              {downloadingType === "docx" ? (
                <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
              ) : (
                <FileCheck2 className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-zinc-100 group-hover:text-indigo-300 transition-colors">
                  Word Document
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/25">
                  .docx
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fully editable Microsoft Word file with matching Times New Roman typography, 10800 twips margins, and links.
              </p>
            </div>
            <div className="self-center flex-shrink-0 text-zinc-500 group-hover:text-indigo-400 transition-colors">
              {downloadingType === "docx" ? (
                <span className="text-xs text-blue-400 font-medium animate-pulse">Exporting...</span>
              ) : (
                <Download className="h-4 w-4" />
              )}
            </div>
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-850 flex items-center justify-between text-[11px] text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Pure client-side export
          </span>
          <button
            type="button"
            onClick={onClose}
            disabled={downloadingType !== null}
            className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-zinc-800 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
