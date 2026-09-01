"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  User,
  Briefcase,
  Code2,
  FolderGit2,
  GraduationCap,
  Award,
} from "lucide-react";

interface AddSectionModalProps {
  open: boolean;
  onClose: () => void;
  existingSections: string[];
}

const ALL_SECTIONS = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal information",
    icon: User,
    color: "indigo",
    gradient: "from-indigo-500/20 to-indigo-600/10",
    border: "border-indigo-500/30",
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
    hoverBorder: "hover:border-indigo-500/50",
    hoverBg: "hover:bg-indigo-500/10",
  },
  {
    id: "experience",
    label: "Experience",
    description: "Work experience",
    icon: Briefcase,
    color: "cyan",
    gradient: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/30",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/50",
    hoverBg: "hover:bg-cyan-500/10",
  },
  {
    id: "skills",
    label: "Skills",
    description: "Skills & expertise",
    icon: Code2,
    color: "purple",
    gradient: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/30",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    hoverBorder: "hover:border-purple-500/50",
    hoverBg: "hover:bg-purple-500/10",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Your projects",
    icon: FolderGit2,
    color: "emerald",
    gradient: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    hoverBorder: "hover:border-emerald-500/50",
    hoverBg: "hover:bg-emerald-500/10",
  },
  {
    id: "education",
    label: "Education",
    description: "Your education",
    icon: GraduationCap,
    color: "amber",
    gradient: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/30",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    hoverBorder: "hover:border-amber-500/50",
    hoverBg: "hover:bg-amber-500/10",
  },
  {
    id: "certificates",
    label: "Certifications",
    description: "Your certificates",
    icon: Award,
    color: "rose",
    gradient: "from-rose-500/20 to-rose-600/10",
    border: "border-rose-500/30",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    hoverBorder: "hover:border-rose-500/50",
    hoverBg: "hover:bg-rose-500/10",
  },
];

export default function AddSectionModal({
  open,
  onClose,
  existingSections,
}: AddSectionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl sm:max-w-xl w-[calc(100vw-1.5rem)] sm:w-full max-h-[88vh] sm:max-h-[85vh] p-0 flex flex-col bg-zinc-900 border-zinc-700/60">
        <DialogHeader className="px-4 pt-4 sm:px-6 sm:pt-5 pb-0">
          <DialogTitle className="text-base sm:text-lg font-semibold text-zinc-100">
            Add New Section
          </DialogTitle>
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
            Choose a section to add to your resume
          </p>
        </DialogHeader>

        <Separator className="bg-zinc-800/80 mt-3 sm:mt-4" />

        <div className="px-4 py-3.5 sm:px-6 sm:py-5 grid grid-cols-2 gap-2.5 sm:gap-3 overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
          {ALL_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isAdded = existingSections.includes(section.id);

            return (
              <button
                key={section.id}
                disabled={isAdded}
                onClick={() => {
                  if (!isAdded) onClose();
                }}
                className={`relative flex flex-col items-start gap-2 p-3 sm:p-4 rounded-xl border transition-all duration-200 text-left group ${
                  isAdded
                    ? "border-zinc-800/60 bg-zinc-800/20 opacity-40 cursor-not-allowed"
                    : `border-zinc-800/70 bg-zinc-800/25 ${section.hoverBorder} ${section.hoverBg} cursor-pointer hover:scale-[1.02] active:scale-95 shadow-sm`
                }`}
              >
                {isAdded && (
                  <span className="absolute top-2 right-2 text-[8px] sm:text-[9px] font-medium text-zinc-600 uppercase tracking-wide">
                    Added
                  </span>
                )}
                <div
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg ${section.iconBg} border ${section.border}`}
                >
                  <Icon className={`h-4 w-4 ${section.iconColor}`} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-100 leading-tight">
                    {section.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5 line-clamp-1 sm:line-clamp-none">{section.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <Separator className="bg-zinc-800/80" />
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 flex justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-zinc-700/80 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
