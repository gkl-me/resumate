"use client"

import { Education, Experience, Profile, Project, ResumeData, ResumeDataType, Skill } from "@/app/data/data"
import { useCallback, useEffect, useState } from "react"


const STORAGE_KEY = 'resumate_user_resume_data'
const SECTION_ORDER_KEY = 'resumate_section_order'
const HIDDEN_SECTIONS_KEY = 'resumate_hidden_sections'

const DEFAULT_SECTION_ORDER = ["profile", "experience", "skill", "project", "education"]


export function useResumeStore() {

    const [data, setData] = useState<ResumeDataType>(ResumeData)

    const [sectionOrder, setSectionOrder] = useState<string[]>(DEFAULT_SECTION_ORDER)
    const [hiddenSections, setHiddenSections] = useState<string[]>([])

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        try {

            const savedData = localStorage.getItem(STORAGE_KEY)
            if (savedData) setData(JSON.parse(savedData))

            const savedOrder = localStorage.getItem(SECTION_ORDER_KEY)
            if (savedOrder) setSectionOrder(JSON.parse(savedOrder))

            const savedHidden = localStorage.getItem(HIDDEN_SECTIONS_KEY)
            if (savedHidden) setHiddenSections(JSON.parse(savedHidden))

        } catch (error) {

            //how to handle error here ?/

        } finally {
            setIsLoaded(true)
        }
    }, [])


    const persist = useCallback((newData: ResumeDataType) => {
        setData(newData)

        try {

            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))

        } catch (error) {
            //error handling
        }
    }, [])

    const updateProfile = useCallback((profile: Profile) => {
        persist({
            ...data,
            profile
        })
    }, [data, persist])

    const updateExperience = useCallback((experience: Experience[]) => {
        persist({
            ...data,
            experience
        })
    }, [data, persist])

    const updateSkills = useCallback((skill: Skill[]) => {
        persist({
            ...data,
            skill
        })
    }, [data, persist])

    const updateProjects = useCallback((project: Project[]) => {
        persist({
            ...data,
            project
        })
    }, [data, persist])

    const updateEducation = useCallback((education: Education[]) => {
        persist({
            ...data,
            education
        })
    }, [data, persist])

    const reorderSections = useCallback((newOrder: string[]) => {
        setSectionOrder(newOrder)
        try {
            localStorage.setItem(SECTION_ORDER_KEY, JSON.stringify(newOrder))
        } catch (error) {
            //error handling
        }
    }, [])

    const toggleSectionVisibility = useCallback((sectionId: string) => {
        if (sectionId === "profile") return; // Profile cannot be hidden

        setHiddenSections((prev) => {
            const next = prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId];
            try {
                localStorage.setItem(HIDDEN_SECTIONS_KEY, JSON.stringify(next));
            } catch (error) {
                // error handling
            }
            return next;
        });
    }, []);

    const resetData = useCallback(() => {
        setData(ResumeData);
        setSectionOrder(DEFAULT_SECTION_ORDER);
        setHiddenSections([]);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ResumeData));
            localStorage.setItem(SECTION_ORDER_KEY, JSON.stringify(DEFAULT_SECTION_ORDER));
            localStorage.setItem(HIDDEN_SECTIONS_KEY, JSON.stringify([]));
        } catch (error) {
            // error handling
        }
    }, []);

    return {
        data,
        isLoaded,
        sectionOrder,
        hiddenSections,
        updateProfile,
        updateExperience,
        updateSkills,
        updateProjects,
        updateEducation,
        reorderSections,
        toggleSectionVisibility,
        resetData
    }

}