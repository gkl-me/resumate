"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap,
  Plus,
  Pencil,
  MapPin,
  CalendarRange,
  Star,
  AlignLeft,
  Building,
} from "lucide-react";
import type { Education } from "@/app/data/data";

import { Trash2 } from "lucide-react";

interface EducationSectionProps {
  data: Education[];
  onUpdate?: (data: Education[]) => void;
}

function EducationModal({
  open,
  onClose,
  education,
  mode,
  onSave,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  education?: Education;
  mode: "add" | "edit";
  onSave?: (data: Education) => void;
  onDelete?: () => void;
}) {
  const defaultForm: Education = {
    institute: "",
    degree: "",
    place: "",
    startYear: "",
    endYear: "",
    description: "",
    grade: "",
  };

  const [form, setForm] = useState<Education>(education ?? defaultForm);

  const handleChange = (field: keyof Education, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl sm:max-w-2xl w-[calc(100vw-1.5rem)] sm:w-full max-h-[88vh] sm:max-h-[85vh] p-0 flex flex-col bg-zinc-900 border-zinc-700/60">
        <DialogHeader className="px-4 pt-4 sm:px-6 sm:pt-5 pb-0">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30 flex-shrink-0">
              <GraduationCap className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-semibold text-zinc-100">
                {mode === "add" ? "Add Education" : "Edit Education"}
              </DialogTitle>
              <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">Academic background</p>
            </div>
          </div>
        </DialogHeader>

        <Separator className="bg-zinc-800/80 mt-3 sm:mt-4" />

        <div className="px-4 py-3.5 sm:px-6 sm:py-5 space-y-3.5 sm:space-y-4 overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
          {/* Institute */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
              <Building className="h-3 w-3 text-zinc-500" /> Institution
            </Label>
            <Input
              value={form.institute}
              onChange={(e) => handleChange("institute", e.target.value)}
              placeholder="National Institute of Technology"
              className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 h-9 sm:h-10 text-xs sm:text-sm"
            />
          </div>

          {/* Degree */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
              Degree / Program
            </Label>
            <Input
              value={form.degree}
              onChange={(e) => handleChange("degree", e.target.value)}
              placeholder="Bachelor of Technology in Computer Science"
              className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 h-9 sm:h-10 text-xs sm:text-sm"
            />
          </div>

          {/* Location + Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-zinc-500" /> Location{" "}
                <span className="text-zinc-600 normal-case font-normal">(Optional)</span>
              </Label>
              <Input
                value={form.place ?? ""}
                onChange={(e) => handleChange("place", e.target.value)}
                placeholder="Kozhikode, India"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <Star className="h-3 w-3 text-zinc-500" /> Grade / GPA{" "}
                <span className="text-zinc-600 normal-case font-normal">(Optional)</span>
              </Label>
              <Input
                value={form.grade ?? ""}
                onChange={(e) => handleChange("grade", e.target.value)}
                placeholder="8.5 / 10 CGPA"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Years */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <CalendarRange className="h-3 w-3 text-zinc-500" /> Start Year
              </Label>
              <Input
                value={form.startYear}
                onChange={(e) => handleChange("startYear", e.target.value)}
                placeholder="2018"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
                End Year
              </Label>
              <Input
                value={form.endYear ?? ""}
                onChange={(e) => handleChange("endYear", e.target.value)}
                placeholder="2022"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
              <AlignLeft className="h-3 w-3 text-zinc-500" /> Description{" "}
              <span className="text-zinc-600 normal-case font-normal">(Optional)</span>
            </Label>
            <Textarea
              value={form.description ?? ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Relevant coursework, activities, achievements..."
              rows={3}
              className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 resize-none leading-relaxed text-xs sm:text-sm"
            />
          </div>
        </div>

        <Separator className="bg-zinc-800/80" />

        <DialogFooter className="px-4 py-3 sm:px-6 sm:py-3.5 flex flex-row items-center justify-between gap-2">
          {mode === "edit" && onDelete ? (
            <Button
              variant="ghost"
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-zinc-700/80 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSave?.(form);
                onClose();
              }}
              className="bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/20 text-xs sm:text-sm h-8 sm:h-9 px-3.5 sm:px-4"
            >
              {mode === "add" ? "Add Education" : "Save Changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function EducationSection({ data, onUpdate }: EducationSectionProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAdd = (item: Education) => {
    onUpdate?.([...data, item]);
  };

  const handleEdit = (item: Education, index: number) => {
    const updated = [...data];
    updated[index] = item;
    onUpdate?.(updated);
  };

  const handleDelete = (index: number) => {
    onUpdate?.(data.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="space-y-2">
        {data.map((edu, i) => (
          <div
            key={i}
            className="group relative flex items-start justify-between p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-amber-500/30 cursor-pointer transition-all duration-200"
            onClick={() => setEditIndex(i)}
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/25 group-hover:bg-amber-500/20 transition-colors flex-shrink-0 mt-0.5">
                <GraduationCap className="h-4 w-4 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-100 leading-tight">{edu.degree}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{edu.institute}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <Badge
                    variant="outline"
                    className="text-[10px] border-zinc-700 text-zinc-500 bg-zinc-800/50 py-0 px-1.5 h-4"
                  >
                    {edu.startYear} – {edu.endYear ?? "Present"}
                  </Badge>
                  {edu.place && (
                    <Badge
                      variant="outline"
                      className="text-[10px] border-zinc-700 text-zinc-500 bg-zinc-800/50 py-0 px-1.5 h-4"
                    >
                      {edu.place}
                    </Badge>
                  )}
                  {edu.grade && (
                    <Badge
                      variant="outline"
                      className="text-[10px] border-amber-500/30 text-amber-300 bg-amber-500/10 py-0 px-1.5 h-4"
                    >
                      {edu.grade}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/30">
                <Pencil className="h-3 w-3 text-amber-400" />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setAddOpen(true)}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-700/60 hover:border-amber-500/40 hover:bg-amber-500/5 text-zinc-500 hover:text-amber-400 text-sm font-medium transition-all duration-200 group cursor-pointer"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-dashed border-zinc-600 group-hover:border-amber-500/50 transition-colors">
            <Plus className="h-3 w-3" />
          </div>
          Add Education
        </button>
      </div>

      {/* Add Modal */}
      {addOpen && (
        <EducationModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          mode="add"
          onSave={handleAdd}
        />
      )}

      {/* Edit Modal */}
      {editIndex !== null && (
        <EducationModal
          open={true}
          onClose={() => setEditIndex(null)}
          education={data[editIndex]}
          mode="edit"
          onSave={(item) => handleEdit(item, editIndex)}
          onDelete={() => handleDelete(editIndex)}
        />
      )}
    </>
  );
}
