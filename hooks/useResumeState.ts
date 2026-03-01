"use client";

import { useState, useEffect, useCallback } from "react";
import { ResumeData, initialResumeData, Experience, Education, Skill, PersonalInfo } from "../types/resume";

const STORAGE_KEY = "resumate_data";

export function useResumeState() {
    const [data, setData] = useState<ResumeData | null>(null);

    // Load from local storage on mount
    useEffect(() => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                setData(JSON.parse(storedData));
            } else {
                setData(initialResumeData);
            }
        } catch (error) {
            console.error("Error loading resume data from localStorage", error);
            setData(initialResumeData);
        }
    }, []);

    // Save to local storage whenever data changes
    useEffect(() => {
        if (data) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            } catch (error) {
                console.error("Error saving resume data to localStorage", error);
            }
        }
    }, [data]);

    const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
        setData((prev) => prev ? { ...prev, personalInfo: { ...prev.personalInfo, ...info } } : prev);
    }, []);

    const updateSummary = useCallback((summary: string) => {
        setData((prev) => prev ? { ...prev, summary } : prev);
    }, []);

    const updateExperience = useCallback((id: string, exp: Partial<Experience>) => {
        setData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                experience: prev.experience.map((e) => e.id === id ? { ...e, ...exp } : e),
            };
        });
    }, []);

    const addExperience = useCallback((exp: Experience) => {
        setData((prev) => prev ? { ...prev, experience: [...prev.experience, exp] } : prev);
    }, []);

    const removeExperience = useCallback((id: string) => {
        setData((prev) => prev ? { ...prev, experience: prev.experience.filter((e) => e.id !== id) } : prev);
    }, []);

    const setExperienceOrder = useCallback((experiences: Experience[]) => {
        setData((prev) => prev ? { ...prev, experience: experiences } : prev);
    }, []);

    const updateEducation = useCallback((id: string, edu: Partial<Education>) => {
        setData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                education: prev.education.map((e) => e.id === id ? { ...e, ...edu } : e),
            };
        });
    }, []);

    const addEducation = useCallback((edu: Education) => {
        setData((prev) => prev ? { ...prev, education: [...prev.education, edu] } : prev);
    }, []);

    const removeEducation = useCallback((id: string) => {
        setData((prev) => prev ? { ...prev, education: prev.education.filter((e) => e.id !== id) } : prev);
    }, []);

    const setEducationOrder = useCallback((educations: Education[]) => {
        setData((prev) => prev ? { ...prev, education: educations } : prev);
    }, []);

    const updateSkill = useCallback((id: string, skill: Partial<Skill>) => {
        setData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                skills: prev.skills.map((s) => s.id === id ? { ...s, ...skill } : s),
            };
        });
    }, []);

    const addSkill = useCallback((skill: Skill) => {
        setData((prev) => prev ? { ...prev, skills: [...prev.skills, skill] } : prev);
    }, []);

    const removeSkill = useCallback((id: string) => {
        setData((prev) => prev ? { ...prev, skills: prev.skills.filter((s) => s.id !== id) } : prev);
    }, []);

    const setSkillOrder = useCallback((skills: Skill[]) => {
        setData((prev) => prev ? { ...prev, skills: skills } : prev);
    }, []);

    const resetData = useCallback(() => {
        setData(initialResumeData);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        data,
        updatePersonalInfo,
        updateSummary,
        updateExperience,
        addExperience,
        removeExperience,
        setExperienceOrder,
        updateEducation,
        addEducation,
        removeEducation,
        setEducationOrder,
        updateSkill,
        addSkill,
        removeSkill,
        setSkillOrder,
        resetData,
    };
}
