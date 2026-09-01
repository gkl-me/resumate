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
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  CalendarRange,
  MapPin,
  ChevronRight,
  X,
  Building2,
} from "lucide-react";
import type { Experience } from "@/app/data/data";

interface ExperienceSectionProps {
  data: Experience[];
  onUpdate?: (data: Experience[]) => void;
}

function ExperienceModal({
  open,
  onClose,
  experience,
  mode,
  onSave,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  experience?: Experience;
  mode: "add" | "edit";
  onSave?: (data: Experience) => void;
  onDelete?: () => void;
}) {
  const defaultForm: Experience = {
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    place: "",
    summary: [""],
  };

  const [form, setForm] = useState<Experience>(experience ?? defaultForm);

  const handleChange = (field: keyof Experience, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBulletChange = (index: number, value: string) => {
    const updated = [...form.summary];
    updated[index] = value;
    setForm((prev) => ({ ...prev, summary: updated }));
  };

  const addBullet = () => {
    setForm((prev) => ({ ...prev, summary: [...prev.summary, ""] }));
  };

  const removeBullet = (index: number) => {
    setForm((prev) => ({
      ...prev,
      summary: prev.summary.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl sm:max-w-2xl w-[calc(100vw-1.5rem)] sm:w-full max-h-[88vh] sm:max-h-[85vh] p-0 flex flex-col bg-zinc-900 border-zinc-700/60">
        <DialogHeader className="px-4 pt-4 sm:px-6 sm:pt-5 pb-0">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex-shrink-0">
              <Briefcase className="h-4 w-4 text-cyan-400" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-semibold text-zinc-100">
                {mode === "add" ? "Add Experience" : "Edit Experience"}
              </DialogTitle>
              <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">Work experience details</p>
            </div>
          </div>
        </DialogHeader>

        <Separator className="bg-zinc-800/80 mt-3 sm:mt-4" />

        <div className="px-4 py-3.5 sm:px-6 sm:py-5 space-y-3.5 sm:space-y-4 overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
          {/* Company + Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <Building2 className="h-3 w-3 text-zinc-500" /> Company
              </Label>
              <Input
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="TechNova Solutions"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
                Job Title / Role
              </Label>
              <Input
                value={form.role}
                onChange={(e) => handleChange("role", e.target.value)}
                placeholder="Full Stack Developer"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <CalendarRange className="h-3 w-3 text-zinc-500" /> Start Date
              </Label>
              <Input
                value={form.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                placeholder="2024"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
                End Date
              </Label>
              <Input
                value={form.endDate ?? ""}
                onChange={(e) => handleChange("endDate", e.target.value)}
                placeholder="Present"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-zinc-500" /> Location
              </Label>
              <Input
                value={form.place ?? ""}
                onChange={(e) => handleChange("place", e.target.value)}
                placeholder="Bangalore, India"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Summary / Bullets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
                Key Responsibilities
              </Label>
              <button
                onClick={addBullet}
                className="flex items-center gap-1 text-[11px] sm:text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" /> Add bullet
              </button>
            </div>
            <div className="space-y-2">
              {form.summary.map((bullet, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <Textarea
                    value={bullet}
                    onChange={(e) => handleBulletChange(i, e.target.value)}
                    placeholder="Describe a key responsibility or achievement..."
                    rows={2}
                    className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/70 resize-none text-xs sm:text-sm flex-1 leading-relaxed"
                  />
                  {form.summary.length > 1 && (
                    <button
                      onClick={() => removeBullet(i)}
                      className="mt-2 p-1 rounded-md hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
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
              className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 text-xs sm:text-sm h-8 sm:h-9 px-3.5 sm:px-4"
            >
              {mode === "add" ? "Add Experience" : "Save Changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ExperienceSection({ data, onUpdate }: ExperienceSectionProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAdd = (item: Experience) => {
    onUpdate?.([...data, item]);
  };

  const handleEdit = (item: Experience, index: number) => {
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
        {data.map((exp, i) => (
          <div
            key={i}
            className="group relative flex items-start justify-between p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-cyan-500/30 cursor-pointer transition-all duration-200"
            onClick={() => setEditIndex(i)}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/25 group-hover:bg-cyan-500/20 transition-colors flex-shrink-0 mt-0.5">
                <Briefcase className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-100 leading-tight">{exp.role}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{exp.company}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge
                    variant="outline"
                    className="text-[10px] border-zinc-700 text-zinc-500 bg-zinc-800/50 py-0 px-1.5 h-4"
                  >
                    {exp.startDate} – {exp.endDate ?? "Present"}
                  </Badge>
                  {exp.place && (
                    <Badge
                      variant="outline"
                      className="text-[10px] border-zinc-700 text-zinc-500 bg-zinc-800/50 py-0 px-1.5 h-4"
                    >
                      {exp.place}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                <Pencil className="h-3 w-3 text-cyan-400" />
              </div>
            </div>
          </div>
        ))}

        {/* Add Button */}
        <button
          onClick={() => setAddOpen(true)}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-700/60 hover:border-cyan-500/40 hover:bg-cyan-500/5 text-zinc-500 hover:text-cyan-400 text-sm font-medium transition-all duration-200 group cursor-pointer"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-dashed border-zinc-600 group-hover:border-cyan-500/50 transition-colors">
            <Plus className="h-3 w-3" />
          </div>
          Add Experience
        </button>
      </div>

      {/* Add Modal */}
      {addOpen && (
        <ExperienceModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          mode="add"
          onSave={handleAdd}
        />
      )}

      {/* Edit Modal */}
      {editIndex !== null && (
        <ExperienceModal
          open={true}
          onClose={() => setEditIndex(null)}
          experience={data[editIndex]}
          mode="edit"
          onSave={(item) => handleEdit(item, editIndex)}
          onDelete={() => handleDelete(editIndex)}
        />
      )}
    </>
  );
}
