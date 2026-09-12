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
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  CalendarRange,
  MapPin,
  X,
  Building2,
  GripVertical,
} from "lucide-react";
import type { Experience } from "@/app/data/data";
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

interface ExperienceSectionProps {
  data: Experience[];
  onUpdate?: (data: Experience[]) => void;
}

interface BulletItem {
  id: string;
  text: string;
}

function SortableBulletItem({
  item,
  onChange,
  onRemove,
  canRemove,
}: {
  item: BulletItem;
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
        title="Drag to reorder bullet"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-3.5 w-3.5" />
      </div>
      <span className="mt-3.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
      <Textarea
        value={item.text}
        onChange={(e) => onChange(item.id, e.target.value)}
        placeholder="Describe a key responsibility or achievement..."
        rows={2}
        className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/70 resize-none text-xs sm:text-sm flex-1 leading-relaxed"
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

  const [bullets, setBullets] = useState<BulletItem[]>(() => {
    const rawBullets = experience?.summary && experience.summary.length > 0 ? experience.summary : [""];
    return rawBullets.map((text, idx) => ({
      id: `bullet-${Date.now().toString(36)}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      text,
    }));
  });

  const bulletSensors = useSensors(
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

  const handleChange = (field: keyof Experience, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBulletChange = (id: string, value: string) => {
    setBullets((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, text: value } : b));
      setForm((f) => ({ ...f, summary: next.map((b) => b.text) }));
      return next;
    });
  };

  const addBullet = () => {
    const newBullet: BulletItem = {
      id: `bullet-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      text: "",
    };
    setBullets((prev) => {
      const next = [...prev, newBullet];
      setForm((f) => ({ ...f, summary: next.map((b) => b.text) }));
      return next;
    });
  };

  const removeBullet = (id: string) => {
    setBullets((prev) => {
      const next = prev.filter((b) => b.id !== id);
      setForm((f) => ({ ...f, summary: next.map((b) => b.text) }));
      return next;
    });
  };

  const handleBulletDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setBullets((prev) => {
      const oldIndex = prev.findIndex((b) => b.id === active.id);
      const newIndex = prev.findIndex((b) => b.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const next = arrayMove(prev, oldIndex, newIndex);
      setForm((f) => ({ ...f, summary: next.map((b) => b.text) }));
      return next;
    });
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

          {/* Summary / Bullets with Drag & Drop */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
                Key Responsibilities (drag to rearrange)
              </Label>
              <button
                type="button"
                onClick={addBullet}
                className="flex items-center gap-1 text-[11px] sm:text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" /> Add bullet
              </button>
            </div>

            <DndContext
              id="dnd-experience-bullets"
              sensors={bulletSensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              onDragEnd={handleBulletDragEnd}
            >
              <SortableContext
                items={bullets.map((b) => b.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2 p-0.5 relative">
                  {bullets.map((b) => (
                    <SortableBulletItem
                      key={b.id}
                      item={b}
                      onChange={handleBulletChange}
                      onRemove={removeBullet}
                      canRemove={bullets.length > 1}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
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

function SortableExperienceCard({
  experience,
  onEdit,
  onDelete,
}: {
  experience: Experience & { id: string };
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
  } = useSortable({ id: experience.id });

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
          ? "transition-none border-cyan-500/70 bg-zinc-900/95 shadow-2xl shadow-cyan-500/10"
          : "transition-all duration-150 border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-cyan-500/30"
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
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/25 group-hover:bg-cyan-500/20 transition-colors flex-shrink-0 mt-0.5">
          <Briefcase className="h-4 w-4 text-cyan-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-100 leading-tight truncate">{experience.role}</p>
          <p className="text-xs text-zinc-400 mt-0.5 truncate">{experience.company}</p>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 flex-wrap">
            <Badge
              variant="outline"
              className="text-[10px] border-zinc-700 text-zinc-500 bg-zinc-800/50 py-0 px-1.5 h-4"
            >
              {experience.startDate} – {experience.endDate ?? "Present"}
            </Badge>
            {experience.place && (
              <Badge
                variant="outline"
                className="text-[10px] border-zinc-700 text-zinc-500 bg-zinc-800/50 py-0 px-1.5 h-4"
              >
                {experience.place}
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
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25 hover:text-cyan-300 transition-colors cursor-pointer active:scale-95"
          title="Edit experience"
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
          title="Delete experience"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function ExperienceSection({ data, onUpdate }: ExperienceSectionProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const itemsWithId = useMemo(() => ensureItemsWithId(data, "exp"), [data]);

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

  const handleAdd = (item: Experience) => {
    onUpdate?.([...data, item]);
  };

  const handleEdit = (item: Experience, index: number) => {
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
          id="dnd-experience-cards"
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
              {itemsWithId.map((exp, i) => (
                <SortableExperienceCard
                  key={exp.id}
                  experience={exp}
                  onEdit={() => setEditIndex(i)}
                  onDelete={() => setDeleteIndex(i)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

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
          key="modal-add-experience"
          open={addOpen}
          onClose={() => setAddOpen(false)}
          mode="add"
          onSave={handleAdd}
        />
      )}

      {/* Edit Modal */}
      {editIndex !== null && (
        <ExperienceModal
          key={`modal-edit-experience-${itemsWithId[editIndex]?.id ?? editIndex}`}
          open={true}
          onClose={() => setEditIndex(null)}
          experience={itemsWithId[editIndex]}
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
          title="Delete Experience"
          itemName={itemsWithId[deleteIndex]?.role || itemsWithId[deleteIndex]?.company}
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
