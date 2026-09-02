"use client"

import { Education, Experience, Profile, Project, ResumeData, ResumeDataType, Skill } from "@/app/data/data"
import { useCallback, useEffect, useState } from "react"


const STORAGE_KEY = 'resumate_user_resume_data'
const SECTION_ORDER_KEY = 'resumate_section_order'

const DEFAULT_SECTION_ORDER = ["profile", "experience", "skill", "project", "education"]


export function useResumeStore() {

    const [data, setData] = useState<ResumeDataType>(ResumeData)

    const [sectionOrder, setSectionOrder] = useState<string[]>(DEFAULT_SECTION_ORDER)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        try {

            const savedData = localStorage.getItem(STORAGE_KEY)
            if (savedData) setData(JSON.parse(savedData))

            const savedOrder = localStorage.getItem(SECTION_ORDER_KEY)
            if (savedOrder) setSectionOrder(JSON.parse(savedOrder))

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

    return {
        data,
        isLoaded,
        sectionOrder,
        updateProfile,
        updateExperience,
        updateSkills,
        updateProjects,
        updateEducation,
        reorderSections
    }

}