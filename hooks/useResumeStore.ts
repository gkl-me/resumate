"use client"

import { Education, Experience, Profile, Project, ResumeData, ResumeDataType, Skill } from "@/app/data/data"
import { useCallback, useEffect, useRef, useState } from "react"


const STORAGE_KEY = 'resumate_user_resume_data'
const SECTION_ORDER_KEY = 'resumate_section_order'
const HIDDEN_SECTIONS_KEY = 'resumate_hidden_sections'

const DEFAULT_SECTION_ORDER = ["profile", "experience", "skill", "project", "education"]

const MAX_HISTORY_STEPS = 30;
const TYPING_DEBOUNCE_MS = 750;

interface HistorySnapshot {
    data: ResumeDataType,
    sectionOrder: string[],
    hiddenSections: string[]
}

export function useResumeStore() {

    const [data, setData] = useState<ResumeDataType>(ResumeData)

    const [sectionOrder, setSectionOrder] = useState<string[]>(DEFAULT_SECTION_ORDER)
    const [hiddenSections, setHiddenSections] = useState<string[]>([])

    const [isLoaded, setIsLoaded] = useState(false)

    //for undo and redo stacks

    const [past, setPast] = useState<HistorySnapshot[]>([])
    const [future, setFuture] = useState<HistorySnapshot[]>([])
    const lastActionTimeRef = useRef(0)


    //load intial data from localstorage
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


    const saveToStorage = useCallback(
        (
            newData: ResumeDataType,
            newOrder: string[],
            newHidden: string[]
        ) => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
                localStorage.setItem(SECTION_ORDER_KEY, JSON.stringify(newOrder))
                localStorage.setItem(HIDDEN_SECTIONS_KEY, JSON.stringify(newHidden))
            } catch (error) {
                console.error("Failed to save state to localstorage", error)
            }
        }
        , [])

    const recordAction = useCallback(
        (
            newData: ResumeDataType,
            newOrder: string[],
            newHidden: string[],
            isTyping = false
        ) => {

            const now = Date.now()
            const isQuick = isTyping && now - lastActionTimeRef.current < TYPING_DEBOUNCE_MS
            lastActionTimeRef.current = now

            if (!isQuick) {
                const currentSnapShot: HistorySnapshot = {
                    data,
                    sectionOrder,
                    hiddenSections
                }

                setPast((prev) => [...prev.slice(-MAX_HISTORY_STEPS), currentSnapShot])
            }

            setFuture([])

            //update the actual state and local storage
            setData(newData)
            setSectionOrder(newOrder)
            setHiddenSections(newHidden)
            saveToStorage(newData, newOrder, newHidden)
        }
        , [data, sectionOrder, hiddenSections, saveToStorage])


    const updateProfile = useCallback((profile: Profile) => {

        recordAction(
            { ...data, profile },
            sectionOrder,
            hiddenSections,
            true
        )

    }, [data, sectionOrder, hiddenSections, recordAction])

    const updateExperience = useCallback((experience: Experience[]) => {
        recordAction(
            { ...data, experience },
            sectionOrder,
            hiddenSections,
            true
        )
    }, [data, sectionOrder, hiddenSections, recordAction])

    const updateSkills = useCallback((skill: Skill[]) => {
        recordAction(
            { ...data, skill },
            sectionOrder,
            hiddenSections,
            true
        )
    }, [data, sectionOrder, hiddenSections, recordAction])

    const updateProjects = useCallback((project: Project[]) => {
        recordAction(
            { ...data, project },
            sectionOrder,
            hiddenSections,
            true
        )
    }, [data, sectionOrder, hiddenSections, recordAction])

    const updateEducation = useCallback((education: Education[]) => {
        recordAction(
            { ...data, education },
            sectionOrder,
            hiddenSections,
            true
        )
    }, [data, sectionOrder, hiddenSections, recordAction])

    const reorderSections = useCallback((newOrder: string[]) => {
        setSectionOrder(newOrder)
        recordAction(
            data,
            newOrder,
            hiddenSections,
            false
        )
    }, [data, sectionOrder, hiddenSections, recordAction])

    const toggleSectionVisibility = useCallback((sectionId: string) => {

        if (sectionId === "profile") return; // Profile cannot be hidden

        const nextHidden = hiddenSections.includes(sectionId)
            ? hiddenSections.filter((id) => id !== sectionId)
            : [...hiddenSections, sectionId];

        recordAction(
            data,
            sectionOrder,
            nextHidden,
            false
        )

    }, [data, sectionOrder, hiddenSections, recordAction]);

    const resetData = useCallback(() => {
        recordAction(ResumeData, DEFAULT_SECTION_ORDER, [], false)
    }, [recordAction]);


    //undo operation
    const undo = useCallback(() => {

        if (past.length === 0) return

        const previousSnapshot = past[past.length - 1]
        const remainingPast = past.slice(0, past.length - 1)

        const currentSnapShot: HistorySnapshot = {
            data,
            sectionOrder,
            hiddenSections
        }

        setFuture((prev) => [currentSnapShot, ...prev])
        setPast(remainingPast)

        setData(previousSnapshot.data)
        setSectionOrder(previousSnapshot.sectionOrder)
        setHiddenSections(previousSnapshot.hiddenSections)

        saveToStorage(
            previousSnapshot.data,
            previousSnapshot.sectionOrder,
            previousSnapshot.hiddenSections
        )

    }, [past, data, sectionOrder, hiddenSections, saveToStorage])

    const redo = useCallback(() => {

        if (future.length === 0) return

        const nextSnaphot = future[0]
        const remainingFuture = future.slice(1)

        const currentSnapShot: HistorySnapshot = {
            data,
            sectionOrder,
            hiddenSections
        }

        setPast((prev) => [...prev, currentSnapShot])
        setFuture(remainingFuture)

        setData(nextSnaphot.data)
        setSectionOrder(nextSnaphot.sectionOrder)
        setHiddenSections(nextSnaphot.hiddenSections)

        saveToStorage(
            nextSnaphot.data,
            nextSnaphot.sectionOrder,
            nextSnaphot.hiddenSections
        )

    }, [future, data, sectionOrder, hiddenSections, saveToStorage])


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
        resetData,
        undo,
        redo,
        canUndo: past.length > 0,
        canRedo: future.length > 0
    }

}