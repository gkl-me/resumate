"use client";

import { useState, useEffect } from "react";
import BuilderHeader from "@/components/builder/BuilderHeader";
import SectionList from "@/components/builder/SectionList";
import ResumePreview from "@/components/builder/ResumePreview";
import { ResumeData, type ResumeDataType, type Profile, type Experience, type Skill, type Project, type Education } from "@/app/data/data";

const STORAGE_KEY = "resumate_user_resume_data";

export default function BuilderPage() {
  const [mobileTab, setMobileTab] = useState<"sections" | "preview">("sections");
  const [resumeData, setResumeData] = useState<ResumeDataType>(ResumeData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setResumeData(JSON.parse(saved));
      }
    } catch {
      // Ignore JSON parse / storage errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  const updateAndPersist = (newData: ResumeDataType) => {
    setResumeData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // Ignore storage errors
    }
  };

  // Reset to default demo data
  const handleReset = () => {
    setResumeData(ResumeData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const handleUpdateProfile = (profile: Profile) => {
    updateAndPersist({ ...resumeData, profile });
  };

  const handleUpdateExperience = (experience: Experience[]) => {
    updateAndPersist({ ...resumeData, experience });
  };

  const handleUpdateSkills = (skill: Skill[]) => {
    updateAndPersist({ ...resumeData, skill });
  };

  const handleUpdateProjects = (project: Project[]) => {
    updateAndPersist({ ...resumeData, project });
  };

  const handleUpdateEducation = (education: Education[]) => {
    updateAndPersist({ ...resumeData, education });
  };

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
        onReset={handleReset}
      />

      {/* Main Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ===== DESKTOP LAYOUT ===== */}
        {/* Left: Section Editor */}
        <aside className="hidden md:flex flex-col w-[380px] lg:w-[420px] flex-shrink-0 border-r border-zinc-800/60 bg-zinc-950/80 overflow-hidden">
          <SectionList
            data={resumeData}
            onUpdateProfile={handleUpdateProfile}
            onUpdateExperience={handleUpdateExperience}
            onUpdateSkills={handleUpdateSkills}
            onUpdateProjects={handleUpdateProjects}
            onUpdateEducation={handleUpdateEducation}
          />
        </aside>

        {/* Right: Resume Preview */}
        <main className="hidden md:flex flex-1 flex-col overflow-hidden bg-zinc-900/20">
          {/* Preview Label */}
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-zinc-800/40 bg-zinc-950/50 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-zinc-500">Live Preview</span>
            </div>
            <span className="text-xs text-zinc-600">A4 · PDF-ready</span>
          </div>
          <ResumePreview data={resumeData} />
        </main>

        {/* ===== MOBILE LAYOUT ===== */}
        <div className="md:hidden flex-1 overflow-hidden">
          {mobileTab === "sections" ? (
            <div className="flex flex-col h-full overflow-hidden bg-zinc-950">
              <SectionList
                data={resumeData}
                onUpdateProfile={handleUpdateProfile}
                onUpdateExperience={handleUpdateExperience}
                onUpdateSkills={handleUpdateSkills}
                onUpdateProjects={handleUpdateProjects}
                onUpdateEducation={handleUpdateEducation}
              />
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-hidden bg-zinc-900/20">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/40 bg-zinc-950/50 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium text-zinc-500">Live Preview</span>
                </div>
                <span className="text-xs text-zinc-600">A4 · PDF-ready</span>
              </div>
              <ResumePreview data={resumeData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
