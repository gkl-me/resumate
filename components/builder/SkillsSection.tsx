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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Code2,
  Plus,
  Pencil,
  X,
  ChevronRight,
  Tag,
} from "lucide-react";
import type { Skill } from "@/app/data/data";

import { Trash2 } from "lucide-react";

interface SkillsSectionProps {
  data: Skill[];
  onUpdate?: (data: Skill[]) => void;
}

function SkillsModal({
  open,
  onClose,
  skill,
  mode,
  onSave,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  skill?: Skill;
  mode: "add" | "edit";
  onSave?: (data: Skill) => void;
  onDelete?: () => void;
}) {
  const [form, setForm] = useState<Skill>(
    skill ?? { category: "", skills: [] }
  );
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !form.skills.includes(trimmed)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== tag),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl sm:max-w-xl w-[calc(100vw-1.5rem)] sm:w-full max-h-[88vh] sm:max-h-[85vh] p-0 flex flex-col bg-zinc-900 border-zinc-700/60">
        <DialogHeader className="px-4 pt-4 sm:px-6 sm:pt-5 pb-0">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30 flex-shrink-0">
              <Code2 className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-semibold text-zinc-100">
                {mode === "add" ? "Add Skill Category" : "Edit Skills"}
              </DialogTitle>
              <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
                Group related skills together
              </p>
            </div>
          </div>
        </DialogHeader>

        <Separator className="bg-zinc-800/80 mt-3 sm:mt-4" />

        <div className="px-4 py-3.5 sm:px-6 sm:py-5 space-y-3.5 sm:space-y-4 overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
          {/* Category */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
              Category Name
            </Label>
            <Input
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, category: e.target.value }))
              }
              placeholder="e.g. Frontend, Backend, DevOps"
              className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:border-purple-500/70 h-9 sm:h-10 text-xs sm:text-sm"
            />
          </div>

          {/* Skills Tags */}
          <div className="space-y-2">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
              <Tag className="h-3 w-3 text-zinc-500" /> Skills{" "}
              <span className="text-zinc-600 normal-case font-normal">
                (press Enter or comma)
              </span>
            </Label>

            {/* Tag chips */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 min-h-9 sm:min-h-10 p-2.5 sm:p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/70">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] sm:text-xs font-medium"
                >
                  {skill}
                  <button
                    onClick={() => removeTag(skill)}
                    className="hover:text-red-400 transition-colors ml-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {form.skills.length === 0 && (
                <span className="text-xs text-zinc-600 self-center">
                  No skills added yet...
                </span>
              )}
            </div>

            {/* Add tag input */}
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="React.js, TypeScript..."
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:border-purple-500/70 h-9 text-xs sm:text-sm flex-1"
              />
              <Button
                onClick={addTag}
                size="sm"
                variant="outline"
                className="border-zinc-700/80 bg-zinc-800/50 hover:bg-purple-500/20 hover:border-purple-500/40 text-zinc-300 hover:text-purple-300 h-9 px-3"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
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
              className="bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20 text-xs sm:text-sm h-8 sm:h-9 px-3.5 sm:px-4"
            >
              {mode === "add" ? "Add Category" : "Save Changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function SkillsSection({ data, onUpdate }: SkillsSectionProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAdd = (item: Skill) => {
    onUpdate?.([...data, item]);
  };

  const handleEdit = (item: Skill, index: number) => {
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
        {data.map((skillGroup, i) => (
          <div
            key={i}
            className="group relative flex items-start justify-between p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-purple-500/30 cursor-pointer transition-all duration-200"
            onClick={() => setEditIndex(i)}
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/25 group-hover:bg-purple-500/20 transition-colors flex-shrink-0">
                <Code2 className="h-4 w-4 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-200">
                  {skillGroup.category}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {skillGroup.skills.slice(0, 6).map((s) => (
                    <Badge
                      key={s}
                      variant="outline"
                      className="text-[10px] border-purple-500/30 text-purple-300 bg-purple-500/10 py-0 px-1.5 h-4"
                    >
                      {s}
                    </Badge>
                  ))}
                  {skillGroup.skills.length > 6 && (
                    <Badge
                      variant="outline"
                      className="text-[10px] border-zinc-700 text-zinc-500 bg-zinc-800/50 py-0 px-1.5 h-4"
                    >
                      +{skillGroup.skills.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 border border-purple-500/30">
                <Pencil className="h-3 w-3 text-purple-400" />
              </div>
            </div>
          </div>
        ))}

        {/* Add Button */}
        <button
          onClick={() => setAddOpen(true)}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-700/60 hover:border-purple-500/40 hover:bg-purple-500/5 text-zinc-500 hover:text-purple-400 text-sm font-medium transition-all duration-200 group cursor-pointer"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-dashed border-zinc-600 group-hover:border-purple-500/50 transition-colors">
            <Plus className="h-3 w-3" />
          </div>
          Add Skill Category
        </button>
      </div>

      {/* Add Modal */}
      {addOpen && (
        <SkillsModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          mode="add"
          onSave={handleAdd}
        />
      )}

      {/* Edit Modal */}
      {editIndex !== null && (
        <SkillsModal
          open={true}
          onClose={() => setEditIndex(null)}
          skill={data[editIndex]}
          mode="edit"
          onSave={(item) => handleEdit(item, editIndex)}
          onDelete={() => handleDelete(editIndex)}
        />
      )}
    </>
  );
}
