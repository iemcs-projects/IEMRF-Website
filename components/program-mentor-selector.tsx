"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { leadershipTeam } from "@/lib/leadership-data"

interface MentorSelectorProps {
  programId: string
  programTitle: string
}

export default function ProgramMentorSelector({ programId, programTitle }: MentorSelectorProps) {
  // Hidden for now - mentor selector will be shown later
  return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request for Mentor</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">Select a mentor from our leadership team to guide you through {programTitle}:</p>
        <div className="space-y-3">
          {leadershipTeam.map((mentor) => (
            <Link
              key={mentor.id}
              href={`/about#${mentor.id}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={mentor.image} alt={mentor.name} />
                <AvatarFallback>{mentor.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900">{mentor.name}</p>
                <p className="text-xs text-gray-600">{mentor.role}</p>
              </div>
              <span className="text-blue-600 text-sm font-medium flex-shrink-0">View Profile →</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
