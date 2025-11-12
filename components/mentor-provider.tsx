"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import useSWR from "swr"

export type MentorInfo = {
  id?: string
  name: string
  image?: string
}

export type ProjectMentorAssignment = {
  mentor?: MentorInfo
  lead?: MentorInfo
  guide?: MentorInfo
}

type MentorState = Record<string, ProjectMentorAssignment>

type MentorContextValue = {
  assignments: MentorState
  setMentorFor: (projectKey: string, kind: keyof ProjectMentorAssignment, info: MentorInfo | undefined) => void
  peopleDirectory: Array<{ id: string; name: string; image?: string; source: "leadership" | "team" }>
}

const MentorContext = createContext<MentorContextValue | undefined>(undefined)

const STORAGE_KEY = "iemrf.mentor.assignments.v1"

export function MentorProvider({ children }: { children: React.ReactNode }) {
  const [assignments, setAssignments] = useState<MentorState>({})

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: serverAssignments } = useSWR<MentorState>("/api/mentors", fetcher)
  const { data: people } = useSWR<Array<{ id: string; name: string; image?: string; source: "leadership" | "team" }>>(
    "/api/people",
    fetcher,
  )

  useEffect(() => {
    if (serverAssignments) setAssignments(serverAssignments)
  }, [serverAssignments])

  const setMentorFor = useCallback(async (projectKey: string, kind: keyof ProjectMentorAssignment, info: MentorInfo | undefined) => {
    const res = await fetch("/api/mentors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectKey, role: kind, info }),
    })
    const json = (await res.json()) as MentorState
    setAssignments(json)
  }, [])

  const peopleDirectory = useMemo(() => people || [], [people])

  const value = useMemo<MentorContextValue>(
    () => ({ assignments, setMentorFor, peopleDirectory }),
    [assignments, setMentorFor, peopleDirectory],
  )

  return <MentorContext.Provider value={value}>{children}</MentorContext.Provider>
}

export function useMentorContext() {
  const ctx = useContext(MentorContext)
  if (!ctx) throw new Error("useMentorContext must be used within MentorProvider")
  return ctx
}

export function getProjectKey(kind: string, id: string) {
  return `${kind}:${id}`
}


