"use client";

import { useState } from "react";
import BuilderHeader from "@/components/builder/BuilderHeader";
import SectionList from "@/components/builder/SectionList";
import { useResumeStore } from "@/hooks/useResumeStore";
import dynamic from "next/dynamic";

const PdfPreviewPanel = dynamic(
  () => import("@/components/pdf/PdfPreviewPanel"),
  { ssr: false }
);

export default function BuilderPage() {
  const [mobileTab, setMobileTab] = useState<"sections" | "preview">("sections");

  const {
    data,
    sectionOrder,
    hiddenSections,
    reorderSections,
    toggleSectionVisibility,
    updateProfile,
    updateExperience,
    updateSkills,
    updateProjects,
    updateEducation,
  } = useResumeStore();

  const visibleSectionOrder = sectionOrder.filter(
    (id) => !hiddenSections.includes(id)
  );

  return (
    <div className="flex flex-col h-screen bg-zinc-950 overflow-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-600/8 blur-[120px]" />
      </div>

      {/* Header */}
      <BuilderHeader
        onToggleMobileTab={setMobileTab}
        activeTab={mobileTab}
        data={data}
        sectionOrder={visibleSectionOrder}
      />

      {/* Main Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Left: Section Editor */}
        <aside
          className={`
            ${mobileTab === "sections" ? "flex" : "hidden"}
            md:flex flex-col w-full md:w-[380px] lg:w-[420px] flex-shrink-0 border-r border-zinc-800/60 bg-zinc-950/80 overflow-hidden h-full
          `}
        >
          <SectionList
            data={data}
            sectionOrder={sectionOrder}
            hiddenSections={hiddenSections}
            onToggleVisibility={toggleSectionVisibility}
            onReorderSections={reorderSections}
            onUpdateProfile={updateProfile}
            onUpdateExperience={updateExperience}
            onUpdateSkills={updateSkills}
            onUpdateProjects={updateProjects}
            onUpdateEducation={updateEducation}
          />
        </aside>

        {/* Right: Resume Preview */}
        <main
          className={`
            ${mobileTab === "preview" ? "flex" : "hidden"}
            md:flex flex-1 flex-col overflow-hidden bg-zinc-900/20 h-full
          `}
        >
          <PdfPreviewPanel data={data} sectionOrder={visibleSectionOrder} />
        </main>
      </div>
    </div>
  );
}
