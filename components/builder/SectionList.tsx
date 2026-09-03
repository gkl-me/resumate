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
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core"

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable"

interface SectionListProps {
  data: ResumeDataType;
  onUpdateProfile?: (profile: Profile) => void;
  onUpdateExperience?: (experience: Experience[]) => void;
  onUpdateSkills?: (skill: Skill[]) => void;
  onUpdateProjects?: (project: Project[]) => void;
  onUpdateEducation?: (education: Education[]) => void;

  //reorder props
  sectionOrder?: string[],
  onReorderSections?: (nuewOrder: string[]) => void;
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
  skill: {
    label: "Skills",
    icon: Code2,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
    headerHover: "hover:bg-purple-500/5",
    borderActive: "border-purple-500/30",
  },
  project: {
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

interface SortableAccordionProps {
  sectionId: string,
  data: ResumeDataType,
  isSortable?: boolean,
  onUpdateProfile?: (profile: Profile) => void;
  onUpdateExperience?: (experience: Experience[]) => void;
  onUpdateSkills?: (skill: Skill[]) => void;
  onUpdateProjects?: (project: Project[]) => void;
  onUpdateEducation?: (education: Education[]) => void;
}

function SortableSectionAccordion({
  sectionId,
  isSortable = true,
  ...props
}: SortableAccordionProps) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: sectionId,
    disabled: !isSortable
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <SectionAccordion
        sectionId={sectionId}
        isSortable={isSortable}
        dragHandleProps={isSortable ? { ...attributes, ...listeners } : undefined}
        isDragging={isDragging}
        {...props}
      />
    </div>
  );

}

function SectionAccordion({
  sectionId,
  data,
  onUpdateProfile,
  onUpdateExperience,
  onUpdateSkills,
  onUpdateProjects,
  onUpdateEducation,

  //drag and drop reordering
  isSortable,
  isDragging,
  dragHandleProps

}: {
  sectionId: string;
  data: ResumeDataType;
  onUpdateProfile?: (profile: Profile) => void;
  onUpdateExperience?: (experience: Experience[]) => void;
  onUpdateSkills?: (skill: Skill[]) => void;
  onUpdateProjects?: (project: Project[]) => void;
  onUpdateEducation?: (education: Education[]) => void;

  //drag and drop reordering

  isSortable?: boolean,
  isDragging?: boolean,
  dragHandleProps?: Record<string, any>
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
      case "skill":
        return <SkillsSection data={data.skill} onUpdate={onUpdateSkills} />;
      case "projects":
      case "project":
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
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${isDragging
        ? "border-indigo-500/60 bg-zinc-900/90 shadow-2xl scale-[1.02]"
        : expanded
          ? `border-zinc-700/60 bg-zinc-900/60`
          : "border-zinc-800/40 bg-zinc-900/20 hover:border-zinc-700/60"
        }`}
    >
      {/* Accordion Header */}
      <div className={`w-full flex items-center px-3 py-3 gap-2 ${meta.headerHover}`}>
        {isSortable ? (
          <div
            {...dragHandleProps}
            className="p-1 rounded cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-300 touch-none flex-shrink-0 transition-colors"
            title="Drag to reorder"
            style={{ touchAction: "none" }}
          >
            <GripVertical className="h-4 w-4" />
          </div>
        ) : (
          /* Profile: fixed placeholder to keep alignment */
          <div className="w-6 flex-shrink-0" />
        )}

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex-1 flex items-center gap-3 text-left cursor-pointer"
        >
          {/* Icon */}
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${meta.iconBg} border border-white/5 flex-shrink-0`}
          >
            <Icon className={`h-3.5 w-3.5 ${meta.iconColor}`} />
          </div>

          {/* Label */}
          <span className="flex-1 text-sm font-semibold text-zinc-200">
            {meta.label}
          </span>

          {/* Chevron */}
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-zinc-500 transition-transform flex-shrink-0" />
          )}
        </button>
      </div>

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

  //reorder
  sectionOrder = ["profile", "experience", "skill", "project", "education"],
  onReorderSections
}: SectionListProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [activeSections] = useState([
    "profile",
    "experience",
    "skills",
    "projects",
    "education",
  ]);


  //config sensor for mobile 
  const sensors = useSensors(

    //pointer for desktop
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),

    //for keyboard
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),

    //for movile touch screen
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6
      }
    })
  )

  const sortableSections = sectionOrder.filter((id) => id !== "profile");

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortableSections.indexOf(active.id as string);
    const newIndex = sortableSections.indexOf(over.id as string);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(sortableSections, oldIndex, newIndex);
      // Always prepend 'profile' so it remains first
      onReorderSections?.(["profile", ...reordered]);
    }
  };

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
          {/* 1. Fixed Non-Sortable Profile Section */}
          <SectionAccordion
            sectionId="profile"
            data={data}
            isSortable={false}
            onUpdateProfile={onUpdateProfile}
          />

          {/* 2. Sortable Sections */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sortableSections}
              strategy={verticalListSortingStrategy}
            >
              {sortableSections.map((id) => (
                <SortableSectionAccordion
                  key={id}
                  sectionId={id}
                  isSortable={true}
                  data={data}
                  onUpdateExperience={onUpdateExperience}
                  onUpdateSkills={onUpdateSkills}
                  onUpdateProjects={onUpdateProjects}
                  onUpdateEducation={onUpdateEducation}
                />
              ))}
            </SortableContext>
          </DndContext>
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
