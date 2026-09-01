"use client";

import { useState } from "react";
import { GripVertical, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { User, Briefcase, Code2, FolderGit2, GraduationCap, Award } from "lucide-react";
import AddSectionModal from "./AddSectionModal";
import ProfileSection from "./ProfileSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import EducationSection from "./EducationSection";
import type { ResumeDataType, Profile, Experience, Skill, Project, Education } from "@/app/data/data";

interface SectionListProps {
  data: ResumeDataType;
  onUpdateProfile?: (profile: Profile) => void;
  onUpdateExperience?: (experience: Experience[]) => void;
  onUpdateSkills?: (skill: Skill[]) => void;
  onUpdateProjects?: (project: Project[]) => void;
  onUpdateEducation?: (education: Education[]) => void;
}

const SECTION_META: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    headerHover: string;
    borderActive: string;
  }
> = {
  profile: {
    label: "Profile",
    icon: User,
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
    headerHover: "hover:bg-indigo-500/5",
    borderActive: "border-indigo-500/30",
  },
  experience: {
    label: "Experience",
    icon: Briefcase,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    headerHover: "hover:bg-cyan-500/5",
    borderActive: "border-cyan-500/30",
  },
  skills: {
    label: "Skills",
    icon: Code2,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
    headerHover: "hover:bg-purple-500/5",
    borderActive: "border-purple-500/30",
  },
  projects: {
    label: "Projects",
    icon: FolderGit2,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    headerHover: "hover:bg-emerald-500/5",
    borderActive: "border-emerald-500/30",
  },
  education: {
    label: "Education",
    icon: GraduationCap,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    headerHover: "hover:bg-amber-500/5",
    borderActive: "border-amber-500/30",
  },
  certificates: {
    label: "Certifications",
    icon: Award,
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-400",
    headerHover: "hover:bg-rose-500/5",
    borderActive: "border-rose-500/30",
  },
};

function SectionAccordion({
  sectionId,
  data,
  onUpdateProfile,
  onUpdateExperience,
  onUpdateSkills,
  onUpdateProjects,
  onUpdateEducation,
}: {
  sectionId: string;
  data: ResumeDataType;
  onUpdateProfile?: (profile: Profile) => void;
  onUpdateExperience?: (experience: Experience[]) => void;
  onUpdateSkills?: (skill: Skill[]) => void;
  onUpdateProjects?: (project: Project[]) => void;
  onUpdateEducation?: (education: Education[]) => void;
}) {
  const [expanded, setExpanded] = useState(sectionId === "profile");
  const meta = SECTION_META[sectionId];
  if (!meta) return null;
  const Icon = meta.icon;

  const renderContent = () => {
    switch (sectionId) {
      case "profile":
        return <ProfileSection data={data.profile} onUpdate={onUpdateProfile} />;
      case "experience":
        return <ExperienceSection data={data.experience} onUpdate={onUpdateExperience} />;
      case "skills":
        return <SkillsSection data={data.skill} onUpdate={onUpdateSkills} />;
      case "projects":
        return <ProjectsSection data={data.project} onUpdate={onUpdateProjects} />;
      case "education":
        return <EducationSection data={data.education} onUpdate={onUpdateEducation} />;
      default:
        return (
          <div className="text-xs text-zinc-500 text-center py-4">
            Coming soon
          </div>
        );
    }
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
        expanded
          ? `border-zinc-700/60 bg-zinc-900/60`
          : "border-zinc-800/40 bg-zinc-900/20 hover:border-zinc-700/60"
      }`}
    >
      {/* Accordion Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors ${meta.headerHover}`}
      >
        {/* Drag handle */}
        <GripVertical className="h-4 w-4 text-zinc-700 hover:text-zinc-500 cursor-grab flex-shrink-0 transition-colors" />

        {/* Icon */}
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${meta.iconBg} border border-white/5 flex-shrink-0`}
        >
          <Icon className={`h-3.5 w-3.5 ${meta.iconColor}`} />
        </div>

        {/* Label */}
        <span className="flex-1 text-sm font-semibold text-zinc-200 text-left">
          {meta.label}
        </span>

        {/* Chevron */}
        {expanded ? (
          <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform flex-shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-zinc-500 transition-transform flex-shrink-0" />
        )}
      </button>

      {/* Accordion Content */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-zinc-800/60">
          {renderContent()}
        </div>
      )}
    </div>
  );
}

export default function SectionList({
  data,
  onUpdateProfile,
  onUpdateExperience,
  onUpdateSkills,
  onUpdateProjects,
  onUpdateEducation,
}: SectionListProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [activeSections] = useState([
    "profile",
    "experience",
    "skills",
    "projects",
    "education",
  ]);

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Sidebar Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-zinc-950/50 sticky top-0 z-10 backdrop-blur-sm">
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Sections
          </h2>
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 hover:border-indigo-500/50 text-indigo-400 hover:text-indigo-300 text-xs font-medium transition-all duration-200 group cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 group-hover:rotate-90 transition-transform duration-200" />
            Add Section
          </button>
        </div>

        {/* Section Accordions */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {activeSections.map((id) => (
            <SectionAccordion
              key={id}
              sectionId={id}
              data={data}
              onUpdateProfile={onUpdateProfile}
              onUpdateExperience={onUpdateExperience}
              onUpdateSkills={onUpdateSkills}
              onUpdateProjects={onUpdateProjects}
              onUpdateEducation={onUpdateEducation}
            />
          ))}
        </div>

        {/* Bottom hint */}
        <div className="px-4 py-3 border-t border-zinc-800/40 bg-zinc-950/30">
          <p className="text-[11px] text-zinc-600 text-center">
            🔒 All data saved locally in your browser
          </p>
        </div>
      </div>

      <AddSectionModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        existingSections={activeSections}
      />
    </>
  );
}
