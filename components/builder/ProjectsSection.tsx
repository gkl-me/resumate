"use client";

import { useState, useMemo } from "react";
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
  FolderGit2,
  Plus,
  Pencil,
  X,
  Link,
  Github,
  Layers,
  Sparkles,
  Trash2,
  GripVertical,
} from "lucide-react";
import type { Project } from "@/app/data/data";
import { ensureItemsWithId } from "@/app/data/data";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

interface ProjectsSectionProps {
  data: Project[];
  onUpdate?: (data: Project[]) => void;
}

interface HighlightItem {
  id: string;
  text: string;
}

function SortableHighlightItem({
  item,
  onChange,
  onRemove,
  canRemove,
}: {
  item: HighlightItem;
  onChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: isDragging ? "none" : transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.75 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-2 group/bullet ${isDragging ? "transition-none shadow-lg" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        style={{ touchAction: "none" }}
        className="mt-2.5 p-0.5 rounded cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-300 touch-none flex-shrink-0 transition-colors"
        title="Drag to reorder highlight"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-3.5 w-3.5" />
      </div>
      <span className="mt-3.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
      <Textarea
        value={item.text}
        onChange={(e) => onChange(item.id, e.target.value)}
        placeholder="Describe a key feature or achievement..."
        rows={2}
        className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/70 resize-none text-xs sm:text-sm flex-1 leading-relaxed"
      />
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="mt-2.5 p-1 rounded-md hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
          title="Remove bullet"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function ProjectsModal({
  open,
  onClose,
  project,
  mode,
  onSave,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  project?: Project;
  mode: "add" | "edit";
  onSave?: (data: Project) => void;
  onDelete?: () => void;
}) {
  const defaultForm: Project = {
    name: "",
    highlights: [""],
    techStack: [],
    liveLink: "",
    github: "",
    year: "",
  };

  const [form, setForm] = useState<Project>(project ?? defaultForm);
  const [techInput, setTechInput] = useState("");

  const [highlights, setHighlights] = useState<HighlightItem[]>(() => {
    const raw = project?.highlights && project.highlights.length > 0 ? project.highlights : [""];
    return raw.map((text, idx) => ({
      id: `highlight-${Date.now().toString(36)}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      text,
    }));
  });

  const highlightSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  const handleChange = (field: keyof Project, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleHighlightChange = (id: string, value: string) => {
    setHighlights((prev) => {
      const next = prev.map((h) => (h.id === id ? { ...h, text: value } : h));
      setForm((f) => ({ ...f, highlights: next.map((h) => h.text) }));
      return next;
    });
  };

  const addHighlight = () => {
    const newHighlight: HighlightItem = {
      id: `highlight-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      text: "",
    };
    setHighlights((prev) => {
      const next = [...prev, newHighlight];
      setForm((f) => ({ ...f, highlights: next.map((h) => h.text) }));
      return next;
    });
  };

  const removeHighlight = (id: string) => {
    setHighlights((prev) => {
      const next = prev.filter((h) => h.id !== id);
      setForm((f) => ({ ...f, highlights: next.map((h) => h.text) }));
      return next;
    });
  };

  const handleHighlightDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setHighlights((prev) => {
      const oldIndex = prev.findIndex((h) => h.id === active.id);
      const newIndex = prev.findIndex((h) => h.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const next = arrayMove(prev, oldIndex, newIndex);
      setForm((f) => ({ ...f, highlights: next.map((h) => h.text) }));
      return next;
    });
  };

  const addTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !form.techStack.includes(trimmed)) {
      setForm((prev) => ({ ...prev, techStack: [...prev.techStack, trimmed] }));
      setTechInput("");
    }
  };

  const removeTech = (t: string) => {
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((s) => s !== t),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl sm:max-w-2xl w-[calc(100vw-1.5rem)] sm:w-full max-h-[88vh] sm:max-h-[85vh] p-0 flex flex-col bg-zinc-900 border-zinc-700/60">
        <DialogHeader className="px-4 pt-4 sm:px-6 sm:pt-5 pb-0">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex-shrink-0">
              <FolderGit2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-semibold text-zinc-100">
                {mode === "add" ? "Add Project" : "Edit Project"}
              </DialogTitle>
              <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">Project information</p>
            </div>
          </div>
        </DialogHeader>

        <Separator className="bg-zinc-800/80 mt-3 sm:mt-4" />

        <div className="px-4 py-3.5 sm:px-6 sm:py-5 space-y-3.5 sm:space-y-4 overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
          {/* Project Name + Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="sm:col-span-2 space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
                Project Name
              </Label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="CloudPulse Analytics"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
                Year / Period
              </Label>
              <Input
                value={form.year ?? ""}
                onChange={(e) => handleChange("year", e.target.value)}
                placeholder="2024"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
              <Layers className="h-3 w-3 text-zinc-500" /> Tech Stack
            </Label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 min-h-9 sm:min-h-10 p-2.5 sm:p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/70">
              {form.techStack.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-xs font-medium"
                >
                  {t}
                  <button type="button" onClick={() => removeTech(t)} className="hover:text-red-400 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {form.techStack.length === 0 && (
                <span className="text-xs text-zinc-600 self-center">Add technologies used...</span>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTech(); } }}
                placeholder="Next.js, TypeScript..."
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/70 h-9 text-xs sm:text-sm flex-1"
              />
              <Button type="button" onClick={addTech} size="sm" variant="outline" className="border-zinc-700/80 bg-zinc-800/50 hover:bg-emerald-500/20 hover:border-emerald-500/40 text-zinc-300 hover:text-emerald-300 h-9 px-3">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Highlights with Drag & Drop */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-zinc-500" /> Highlights (drag to rearrange)
              </Label>
              <button
                type="button"
                onClick={addHighlight}
                className="flex items-center gap-1 text-[11px] sm:text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" /> Add bullet
              </button>
            </div>

            <DndContext
              id="dnd-project-highlights"
              sensors={highlightSensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              onDragEnd={handleHighlightDragEnd}
            >
              <SortableContext
                items={highlights.map((h) => h.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2 p-0.5 relative">
                  {highlights.map((h) => (
                    <SortableHighlightItem
                      key={h.id}
                      item={h}
                      onChange={handleHighlightChange}
                      onRemove={removeHighlight}
                      canRemove={highlights.length > 1}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <Link className="h-3 w-3 text-zinc-500" /> Live Link
              </Label>
              <Input
                value={form.liveLink ?? ""}
                onChange={(e) => handleChange("liveLink", e.target.value)}
                placeholder="https://project.example.com"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <Github className="h-3 w-3 text-zinc-500" /> GitHub
              </Label>
              <Input
                value={form.github ?? ""}
                onChange={(e) => handleChange("github", e.target.value)}
                placeholder="https://github.com/you/project"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
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
              className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 text-xs sm:text-sm h-8 sm:h-9 px-3.5 sm:px-4"
            >
              {mode === "add" ? "Add Project" : "Save Changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SortableProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Project & { id: string };
  onEdit: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: isDragging ? "none" : transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-start justify-between p-3.5 sm:p-4 rounded-xl border cursor-pointer ${
        isDragging
          ? "transition-none border-emerald-500/70 bg-zinc-900/95 shadow-2xl shadow-emerald-500/10"
          : "transition-all duration-150 border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-emerald-500/30"
      }`}
      onClick={onEdit}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        style={{ touchAction: "none" }}
        className="p-1 -ml-1.5 mr-1.5 rounded cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-300 touch-none flex-shrink-0 transition-colors self-center sm:self-start mt-0.5"
        title="Drag to reorder"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-4 w-4" />
      </div>

      <div className="flex items-start gap-3 flex-1 min-w-0 pr-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/25 group-hover:bg-emerald-500/20 transition-colors flex-shrink-0 mt-0.5">
          <FolderGit2 className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-zinc-100 truncate">{project.name}</p>
            {project.year && (
              <Badge variant="outline" className="text-[10px] border-zinc-700 text-zinc-500 bg-zinc-800/50 py-0 px-1.5 h-4 flex-shrink-0">
                {project.year}
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.techStack.slice(0, 5).map((t) => (
              <Badge key={t} variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-300 bg-emerald-500/10 py-0 px-1.5 h-4">
                {t}
              </Badge>
            ))}
            {project.techStack.length > 5 && (
              <Badge variant="outline" className="text-[10px] border-zinc-700 text-zinc-500 bg-zinc-800/50 py-0 px-1.5 h-4">
                +{project.techStack.length - 5}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Actions: visible on mobile, reveal on hover for desktop */}
      <div className="flex items-center gap-1 sm:gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 hover:text-emerald-300 transition-colors cursor-pointer active:scale-95"
          title="Edit project"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors cursor-pointer active:scale-95"
          title="Delete project"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function ProjectsSection({ data, onUpdate }: ProjectsSectionProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const itemsWithId = useMemo(() => ensureItemsWithId(data, "proj"), [data]);

  const cardSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  const handleAdd = (item: Project) => {
    onUpdate?.([...data, item]);
  };

  const handleEdit = (item: Project, index: number) => {
    const updated = [...itemsWithId];
    updated[index] = { ...item, id: itemsWithId[index].id };
    onUpdate?.(updated);
  };

  const handleDelete = (index: number) => {
    onUpdate?.(itemsWithId.filter((_, i) => i !== index));
  };

  const handleCardDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = itemsWithId.findIndex((item) => item.id === active.id);
    const newIndex = itemsWithId.findIndex((item) => item.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(itemsWithId, oldIndex, newIndex);
      onUpdate?.(reordered);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <DndContext
          id="dnd-project-cards"
          sensors={cardSensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          onDragEnd={handleCardDragEnd}
        >
          <SortableContext
            items={itemsWithId.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2 p-0.5 relative">
              {itemsWithId.map((project, i) => (
                <SortableProjectCard
                  key={project.id}
                  project={project}
                  onEdit={() => setEditIndex(i)}
                  onDelete={() => setDeleteIndex(i)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <button
          onClick={() => setAddOpen(true)}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-700/60 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-zinc-500 hover:text-emerald-400 text-sm font-medium transition-all duration-200 group cursor-pointer"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-dashed border-zinc-600 group-hover:border-emerald-500/50 transition-colors">
            <Plus className="h-3 w-3" />
          </div>
          Add Project
        </button>
      </div>

      {/* Add Modal */}
      {addOpen && (
        <ProjectsModal
          key="modal-add-project"
          open={addOpen}
          onClose={() => setAddOpen(false)}
          mode="add"
          onSave={handleAdd}
        />
      )}

      {/* Edit Modal */}
      {editIndex !== null && (
        <ProjectsModal
          key={`modal-edit-project-${itemsWithId[editIndex]?.id ?? editIndex}`}
          open={true}
          onClose={() => setEditIndex(null)}
          project={itemsWithId[editIndex]}
          mode="edit"
          onSave={(item) => handleEdit(item, editIndex)}
          onDelete={() => handleDelete(editIndex)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteIndex !== null && (
        <DeleteConfirmModal
          open={deleteIndex !== null}
          onClose={() => setDeleteIndex(null)}
          title="Delete Project"
          itemName={itemsWithId[deleteIndex]?.name}
          onConfirm={() => {
            if (deleteIndex !== null) {
              handleDelete(deleteIndex);
              setDeleteIndex(null);
            }
          }}
        />
      )}
    </>
  );
}
