"use client";

import { ResumeDataType } from "@/app/data/data";
import dynamic from "next/dynamic";
import { ResumePdfDocumnet } from "./ResumePdfDocument";
import ResumePreview from "@/components/builder/ResumePreview";
import { Loader2 } from "lucide-react";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-zinc-400">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
        <p className="text-xs">Loading PDF Preview...</p>
      </div>
    ),
  }
);

interface PdfPreviewPanelProps {
  data: ResumeDataType;
  sectionOrder?: string[];
}

export default function PdfPreviewPanel({
  data,
  sectionOrder,
}: PdfPreviewPanelProps) {
  const doc = <ResumePdfDocumnet data={data} sectionOrder={sectionOrder} />;

  return (
    <div className="w-full h-full flex-1 flex flex-col overflow-hidden">
      {/* Mobile view: 1:1 LaTeX-styled HTML Paper Preview (works flawlessly on iOS Safari & Android Chrome) */}
      <div className="flex-1 w-full h-full md:hidden overflow-hidden flex flex-col">
        <ResumePreview data={data} sectionOrder={sectionOrder} />
      </div>

      {/* Desktop view: Native PDFViewer */}
      <div className="hidden md:flex w-full h-full flex-1 items-center justify-center p-4 md:p-6 overflow-hidden">
        <div className="w-full h-full max-w-4xl bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800/80 flex flex-col">
          <PDFViewer
            key={(sectionOrder || []).join("-")}
            width="100%"
            height="100%"
            showToolbar={false}
            className="w-full h-full border-none"
          >
            {doc}
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}