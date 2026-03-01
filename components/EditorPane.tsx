"use client";

import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Experience, Education, Skill } from "../types/resume";
import { GripVertical, Trash2, Plus, RefreshCcw } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

// Sortable Item Wrapper
function SortableItem(props: { id: string; children: React.ReactNode; onRemove?: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div ref={setNodeRef} style={style} className="relative group mb-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm">
            <div className="absolute left-2 top-4 cursor-grab text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" {...attributes} {...listeners}>
                <GripVertical className="h-5 w-5" />
            </div>
            <div className="pl-6">
                {props.children}
            </div>
            {props.onRemove && (
                <button onClick={props.onRemove} className="absolute right-4 top-4 text-zinc-400 hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}

// Main Editor Component
export function EditorPane({ hook }: { hook: any }) {
    const { data, updatePersonalInfo, updateSummary, updateExperience, addExperience, removeExperience, setExperienceOrder, updateEducation, addEducation, removeEducation, setEducationOrder, updateSkill, addSkill, removeSkill, setSkillOrder, resetData } = hook;

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEndExp = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = data.experience.findIndex((i: any) => i.id === active.id);
            const newIndex = data.experience.findIndex((i: any) => i.id === over.id);
            setExperienceOrder(arrayMove(data.experience, oldIndex, newIndex));
        }
    };

    const handleDragEndEdu = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = data.education.findIndex((i: any) => i.id === active.id);
            const newIndex = data.education.findIndex((i: any) => i.id === over.id);
            setEducationOrder(arrayMove(data.education, oldIndex, newIndex));
        }
    };

    const handleDragEndSkill = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = data.skills.findIndex((i: any) => i.id === active.id);
            const newIndex = data.skills.findIndex((i: any) => i.id === over.id);
            setSkillOrder(arrayMove(data.skills, oldIndex, newIndex));
        }
    };

    if (!data) return null;

    return (
        <div className="flex flex-col gap-8 p-6 lg:p-10 pb-32">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Resume Editor</h1>
                    <p className="text-sm text-zinc-500 mt-1">Updates map instantly to the live PDF preview.</p>
                </div>
                <button
                    onClick={() => { if (window.confirm('Are you sure you want to reset all data?')) resetData(); }}
                    className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-500/20 transition-colors"
                >
                    <RefreshCcw className="h-4 w-4" /> Reset
                </button>
            </div>

            {/* Personal Info */}
            <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="input-field border dark:border-zinc-700 bg-transparent p-2 rounded" placeholder="Full Name" value={data.personalInfo.fullName} onChange={e => updatePersonalInfo({ fullName: e.target.value })} />
                    <input className="input-field border dark:border-zinc-700 bg-transparent p-2 rounded" placeholder="Email" value={data.personalInfo.email} onChange={e => updatePersonalInfo({ email: e.target.value })} />
                    <input className="input-field border dark:border-zinc-700 bg-transparent p-2 rounded" placeholder="Phone" value={data.personalInfo.phone} onChange={e => updatePersonalInfo({ phone: e.target.value })} />
                    <input className="input-field border dark:border-zinc-700 bg-transparent p-2 rounded" placeholder="Location" value={data.personalInfo.location} onChange={e => updatePersonalInfo({ location: e.target.value })} />
                    <input className="input-field border dark:border-zinc-700 bg-transparent p-2 rounded" placeholder="Website" value={data.personalInfo.website} onChange={e => updatePersonalInfo({ website: e.target.value })} />
                    <input className="input-field border dark:border-zinc-700 bg-transparent p-2 rounded" placeholder="GitHub" value={data.personalInfo.github} onChange={e => updatePersonalInfo({ github: e.target.value })} />
                </div>
            </section>

            {/* Summary */}
            <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">Professional Summary</h2>
                <textarea
                    className="w-full min-h-[100px] border dark:border-zinc-700 bg-transparent p-3 rounded"
                    placeholder="A brief summary of your professional background..."
                    value={data.summary}
                    onChange={e => updateSummary(e.target.value)}
                />
            </section>

            {/* Experience */}
            <section>
                <div className="flex items-center justify-between mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Experience</h2>
                    <button onClick={() => addExperience({ id: uuidv4(), company: '', role: '', startDate: '', endDate: '', description: '' })} className="text-indigo-500 hover:text-indigo-400 font-medium text-sm flex items-center gap-1">
                        <Plus className="h-4 w-4" /> Add
                    </button>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndExp}>
                    <SortableContext items={data.experience} strategy={verticalListSortingStrategy}>
                        {data.experience.map((exp: Experience) => (
                            <SortableItem key={exp.id} id={exp.id} onRemove={() => removeExperience(exp.id)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 pr-8">
                                    <input className="border dark:border-zinc-700 bg-transparent p-2 rounded text-sm font-semibold" placeholder="Company" value={exp.company} onChange={e => updateExperience(exp.id, { company: e.target.value })} />
                                    <input className="border dark:border-zinc-700 bg-transparent p-2 rounded text-sm" placeholder="Role (e.g. Senior Engineer)" value={exp.role} onChange={e => updateExperience(exp.id, { role: e.target.value })} />
                                    <input className="border dark:border-zinc-700 bg-transparent p-2 rounded text-sm" placeholder="Start Date" value={exp.startDate} onChange={e => updateExperience(exp.id, { startDate: e.target.value })} />
                                    <input className="border dark:border-zinc-700 bg-transparent p-2 rounded text-sm" placeholder="End Date" value={exp.endDate} onChange={e => updateExperience(exp.id, { endDate: e.target.value })} />
                                </div>
                                <textarea className="w-full border dark:border-zinc-700 bg-transparent p-2 rounded text-sm min-h-[80px]" placeholder="Description (Markdown or Plain Text)" value={exp.description} onChange={e => updateExperience(exp.id, { description: e.target.value })} />
                            </SortableItem>
                        ))}
                    </SortableContext>
                </DndContext>
            </section>

            {/* Education */}
            <section>
                <div className="flex items-center justify-between mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Education</h2>
                    <button onClick={() => addEducation({ id: uuidv4(), institution: '', degree: '', startDate: '', endDate: '' })} className="text-indigo-500 hover:text-indigo-400 font-medium text-sm flex items-center gap-1">
                        <Plus className="h-4 w-4" /> Add
                    </button>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndEdu}>
                    <SortableContext items={data.education} strategy={verticalListSortingStrategy}>
                        {data.education.map((edu: Education) => (
                            <SortableItem key={edu.id} id={edu.id} onRemove={() => removeEducation(edu.id)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                                    <input className="border dark:border-zinc-700 bg-transparent p-2 rounded text-sm font-semibold" placeholder="Institution" value={edu.institution} onChange={e => updateEducation(edu.id, { institution: e.target.value })} />
                                    <input className="border dark:border-zinc-700 bg-transparent p-2 rounded text-sm" placeholder="Degree" value={edu.degree} onChange={e => updateEducation(edu.id, { degree: e.target.value })} />
                                    <input className="border dark:border-zinc-700 bg-transparent p-2 rounded text-sm" placeholder="Start Date" value={edu.startDate} onChange={e => updateEducation(edu.id, { startDate: e.target.value })} />
                                    <input className="border dark:border-zinc-700 bg-transparent p-2 rounded text-sm" placeholder="End Date" value={edu.endDate} onChange={e => updateEducation(edu.id, { endDate: e.target.value })} />
                                </div>
                            </SortableItem>
                        ))}
                    </SortableContext>
                </DndContext>
            </section>

            {/* Skills */}
            <section>
                <div className="flex items-center justify-between mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Skills</h2>
                    <button onClick={() => addSkill({ id: uuidv4(), category: '', name: '' })} className="text-indigo-500 hover:text-indigo-400 font-medium text-sm flex items-center gap-1">
                        <Plus className="h-4 w-4" /> Add
                    </button>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndSkill}>
                    <SortableContext items={data.skills} strategy={verticalListSortingStrategy}>
                        {data.skills.map((skill: Skill) => (
                            <SortableItem key={skill.id} id={skill.id} onRemove={() => removeSkill(skill.id)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                                    <input className="border dark:border-zinc-700 bg-transparent p-2 rounded text-sm font-semibold" placeholder="Category (e.g. Languages)" value={skill.category} onChange={e => updateSkill(skill.id, { category: e.target.value })} />
                                    <input className="border dark:border-zinc-700 bg-transparent p-2 rounded text-sm" placeholder="Skills (comma separated)" value={skill.name} onChange={e => updateSkill(skill.id, { name: e.target.value })} />
                                </div>
                            </SortableItem>
                        ))}
                    </SortableContext>
                </DndContext>
            </section>

        </div>
    );
}
