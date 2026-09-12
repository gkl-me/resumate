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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Code2,
  Plus,
  Pencil,
  X,
  Tag,
  Trash2,
  GripVertical,
} from "lucide-react";
import type { Skill } from "@/app/data/data";
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
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

interface SkillsSectionProps {
  data: Skill[];
  onUpdate?: (data: Skill[]) => void;
}

interface SkillTagItem {
  id: string;
  name: string;
}

function SortableSkillTag({
  tag,
  onRemove,
}: {
  tag: SkillTagItem;
  onRemove: (name: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tag.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: isDragging ? "none" : transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.75 : 1,
  };

  return (
    <span
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] sm:text-xs font-medium ${
        isDragging
          ? "transition-none ring-2 ring-purple-400 bg-purple-500/40 shadow-xl shadow-purple-500/20"
          : "transition-all duration-150 hover:bg-purple-500/25"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        style={{ touchAction: "none" }}
        className="p-0.5 -ml-0.5 rounded cursor-grab active:cursor-grabbing text-purple-400/60 hover:text-purple-300 touch-none flex-shrink-0"
        title="Drag to reorder skill"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-3 w-3" />
      </div>
      <span>{tag.name}</span>
      <button
        type="button"
        onClick={() => onRemove(tag.name)}
        className="hover:text-red-400 transition-colors ml-0.5 cursor-pointer p-0.5"
        title="Remove skill"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
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
  const defaultForm: Skill = {
    category: "",
    skills: [],
  };

  const [form, setForm] = useState<Skill>(skill ?? defaultForm);
  const [tagInput, setTagInput] = useState("");

  const [tags, setTags] = useState<SkillTagItem[]>(() => {
    const raw = skill?.skills && skill.skills.length > 0 ? skill.skills : [];
    return raw.map((name, idx) => ({
      id: `skilltag-${Date.now().toString(36)}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      name,
    }));
  });

  const tagSensors = useSensors(
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

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) {
      const newTag: SkillTagItem = {
        id: `skilltag-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        name: trimmed,
      };
      setTags((prev) => {
        const next = [...prev, newTag];
        setForm((f) => ({ ...f, skills: next.map((t) => t.name) }));
        return next;
      });
      setTagInput("");
    }
  };

  const removeTag = (name: string) => {
    setTags((prev) => {
      const next = prev.filter((t) => t.name !== name);
      setForm((f) => ({ ...f, skills: next.map((t) => t.name) }));
      return next;
    });
  };

  const handleTagDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setTags((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === active.id);
      const newIndex = prev.findIndex((t) => t.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const next = arrayMove(prev, oldIndex, newIndex);
      setForm((f) => ({ ...f, skills: next.map((t) => t.name) }));
      return next;
    });
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
                {mode === "add" ? "Add Skill Category" : "Edit Skill Category"}
              </DialogTitle>
              <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
                Group your technical skills
              </p>
            </div>
          </div>
        </DialogHeader>

        <Separator className="bg-zinc-800/80 mt-3 sm:mt-4" />

        <div className="px-4 py-3.5 sm:px-6 sm:py-5 space-y-3.5 sm:space-y-4 overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
          {/* Category Name */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
              Category Name
            </Label>
            <Input
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, category: e.target.value }))
              }
              placeholder="e.g. Frontend, DevOps, Languages"
              className="bg-zinc-800/60 border-zinc-700/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:border-purple-500/70 h-9 sm:h-10 text-xs sm:text-sm"
            />
          </div>

          {/* Skills Tags with Drag & Drop */}
          <div className="space-y-2">
            <Label className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
              <Tag className="h-3 w-3 text-zinc-500" /> Skills (drag to rearrange)
            </Label>

            {/* Tag chips */}
            <div className="min-h-9 sm:min-h-10 p-2.5 sm:p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/70">
              <DndContext
                id="dnd-modal-skills"
                sensors={tagSensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToParentElement]}
                onDragEnd={handleTagDragEnd}
              >
                <SortableContext
                  items={tags.map((t) => t.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 p-0.5 relative">
                    {tags.map((tag) => (
                      <SortableSkillTag
                        key={tag.id}
                        tag={tag}
                        onRemove={removeTag}
                      />
                    ))}
                    {tags.length === 0 && (
                      <span className="text-xs text-zinc-600 self-center">
                        No skills added yet...
                      </span>
                    )}
                  </div>
                </SortableContext>
              </DndContext>
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
                type="button"
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

function SortableSkillCategoryCard({
  skillGroup,
  onEdit,
  onDelete,
}: {
  skillGroup: Skill & { id: string };
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
  } = useSortable({ id: skillGroup.id });

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
          ? "transition-none border-purple-500/70 bg-zinc-900/95 shadow-2xl shadow-purple-500/10"
          : "transition-all duration-150 border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-purple-500/30"
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
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/25 group-hover:bg-purple-500/20 transition-colors flex-shrink-0 mt-0.5">
          <Code2 className="h-4 w-4 text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-200 truncate">
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

      {/* Actions: visible on mobile, reveal on hover for desktop */}
      <div className="flex items-center gap-1 sm:gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 hover:bg-purple-500/25 hover:text-purple-300 transition-colors cursor-pointer active:scale-95"
          title="Edit skill category"
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
          title="Delete skill category"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function SkillsSection({ data, onUpdate }: SkillsSectionProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const itemsWithId = useMemo(() => ensureItemsWithId(data, "skill"), [data]);

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

  const handleAdd = (item: Skill) => {
    onUpdate?.([...data, item]);
  };

  const handleEdit = (item: Skill, index: number) => {
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
          id="dnd-skills-cards"
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
              {itemsWithId.map((skillGroup, i) => (
                <SortableSkillCategoryCard
                  key={skillGroup.id}
                  skillGroup={skillGroup}
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
          key="modal-add-skills"
          open={addOpen}
          onClose={() => setAddOpen(false)}
          mode="add"
          onSave={handleAdd}
        />
      )}

      {/* Edit Modal */}
      {editIndex !== null && (
        <SkillsModal
          key={`modal-edit-skills-${itemsWithId[editIndex]?.id ?? editIndex}`}
          open={true}
          onClose={() => setEditIndex(null)}
          skill={itemsWithId[editIndex]}
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
          title="Delete Skill Category"
          itemName={itemsWithId[deleteIndex]?.category}
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
