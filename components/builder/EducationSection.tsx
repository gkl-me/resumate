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
  GraduationCap,
  Plus,
  Pencil,
  MapPin,
  CalendarRange,
  Star,
  AlignLeft,
  Building,
  Trash2,
  GripVertical,
} from "lucide-react";
import type { Education } from "@/app/data/data";
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
    grade: "",
    description: "",
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
          {/* Degree */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
              Degree / Course
            </Label>
            <Input
              value={form.degree}
              onChange={(e) => handleChange("degree", e.target.value)}
              placeholder="B.Tech in Computer Science and Engineering"
              className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 h-9 sm:h-10 text-xs sm:text-sm"
            />
          </div>

          {/* Institute + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <Building className="h-3 w-3 text-zinc-500" /> Institute / University
              </Label>
              <Input
                value={form.institute}
                onChange={(e) => handleChange("institute", e.target.value)}
                placeholder="Indian Institute of Technology, Madras"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-zinc-500" /> Location
              </Label>
              <Input
                value={form.place ?? ""}
                onChange={(e) => handleChange("place", e.target.value)}
                placeholder="Chennai, India"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Years + Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <CalendarRange className="h-3 w-3 text-zinc-500" /> Start Year
              </Label>
              <Input
                value={form.startYear}
                onChange={(e) => handleChange("startYear", e.target.value)}
                placeholder="2020"
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
                placeholder="2024"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                <Star className="h-3 w-3 text-zinc-500" /> Grade / CGPA
              </Label>
              <Input
                value={form.grade ?? ""}
                onChange={(e) => handleChange("grade", e.target.value)}
                placeholder="8.9 / 10 CGPA"
                className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
              <AlignLeft className="h-3 w-3 text-zinc-500" /> Relevant Coursework / Achievements
            </Label>
            <Textarea
              value={form.description ?? ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks..."
              rows={3}
              className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/70 resize-none text-xs sm:text-sm leading-relaxed"
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

function SortableEducationCard({
  education,
  onEdit,
  onDelete,
}: {
  education: Education & { id: string };
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
  } = useSortable({ id: education.id });

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
          ? "transition-none border-amber-500/70 bg-zinc-900/95 shadow-2xl shadow-amber-500/10"
          : "transition-all duration-150 border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-amber-500/30"
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
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/25 group-hover:bg-amber-500/20 transition-colors flex-shrink-0 mt-0.5">
          <GraduationCap className="h-4 w-4 text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-100 leading-tight truncate">{education.degree}</p>
          <p className="text-xs text-zinc-400 mt-0.5 truncate">{education.institute}</p>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 flex-wrap">
            <Badge
              variant="outline"
              className="text-[10px] border-zinc-700 text-zinc-500 bg-zinc-800/50 py-0 px-1.5 h-4"
            >
              {education.startYear} – {education.endYear ?? "Present"}
            </Badge>
            {education.place && (
              <Badge
                variant="outline"
                className="text-[10px] border-zinc-700 text-zinc-500 bg-zinc-800/50 py-0 px-1.5 h-4"
              >
                {education.place}
              </Badge>
            )}
            {education.grade && (
              <Badge
                variant="outline"
                className="text-[10px] border-amber-500/30 text-amber-300 bg-amber-500/10 py-0 px-1.5 h-4"
              >
                {education.grade}
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
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25 hover:text-amber-300 transition-colors cursor-pointer active:scale-95"
          title="Edit education"
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
          title="Delete education"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function EducationSection({ data, onUpdate }: EducationSectionProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const itemsWithId = useMemo(() => ensureItemsWithId(data, "edu"), [data]);

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

  const handleAdd = (item: Education) => {
    onUpdate?.([...data, item]);
  };

  const handleEdit = (item: Education, index: number) => {
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
          id="dnd-education-cards"
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
              {itemsWithId.map((edu, i) => (
                <SortableEducationCard
                  key={edu.id}
                  education={edu}
                  onEdit={() => setEditIndex(i)}
                  onDelete={() => setDeleteIndex(i)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

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
          key="modal-add-education"
          open={addOpen}
          onClose={() => setAddOpen(false)}
          mode="add"
          onSave={handleAdd}
        />
      )}

      {/* Edit Modal */}
      {editIndex !== null && (
        <EducationModal
          key={`modal-edit-education-${itemsWithId[editIndex]?.id ?? editIndex}`}
          open={true}
          onClose={() => setEditIndex(null)}
          education={itemsWithId[editIndex]}
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
          title="Delete Education"
          itemName={itemsWithId[deleteIndex]?.degree || itemsWithId[deleteIndex]?.institute}
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
