"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { Play, ExternalLink, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DownloadButton from "@/components/download-button"
import { getProjectDownloadUrl } from "@/lib/downloads"
import { findPersonByName } from "@/lib/people"

type Props = {
  startup: {
    id: string
    name: string
    status: "ongoing" | "established"
    ideaVision: string
    goal: string
    productOverview: string
    guide: string
    lead: string
    teamMembers: string[]
    tags: string[]
    progress?: number
    demoUrl?: string
    videoUrl?: string
    posterUrl?: string
    updatedAt: string
  }
}

export function StartupCard({ startup }: Props) {
  const isOngoing = startup.status === "ongoing"
  const statusColor = isOngoing ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"
  const borderColor = isOngoing ? "border-blue-600" : "border-emerald-600"
  const resolvedGuide = findPersonByName(startup.guide)
  const resolvedLead = findPersonByName(startup.lead)

  const [imageIndex, setImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const dynamicImages = [
    `/startups/${startup.id}.jpg`,
    `/startups/${startup.id}-demo.jpg`,
    `/startups/${startup.id}-team.jpg`,
  ]

  useEffect(() => {
    if (!isHovered) return
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % dynamicImages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isHovered, dynamicImages.length])

  return (
    <Card
      className={cn(
        "h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group overflow-hidden",
        "border-2",
        borderColor,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setImageIndex(0)
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {dynamicImages.map((img, idx) => (
          <img
            key={idx}
            src={img || "/placeholder.svg"}
            alt={`${startup.name} ${idx === 0 ? "main" : idx === 1 ? "demo" : "team"} image`}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-700",
              "group-hover:scale-110",
              idx === imageIndex ? "opacity-100" : "opacity-0",
            )}
            onError={(e) => {
              if (idx > 0) {
                e.currentTarget.src = `/startups/default-${startup.status}.jpg`
              }
            }}
          />
        ))}

        {/* Image indicators */}
        {isHovered && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
            {dynamicImages.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  idx === imageIndex ? "bg-white scale-110" : "bg-white/50",
                )}
              />
            ))}
          </div>
        )}

        {/* Status overlay */}
        <div className="absolute top-3 right-3 z-20">
          <Badge className={cn(statusColor, "shadow-lg")} aria-label={`Status: ${startup.status}`}>
            {isOngoing ? "Ongoing" : "Established"}
          </Badge>
        </div>
        {resolvedGuide ? (
          <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={resolvedGuide.image} alt={resolvedGuide.name} />
              <AvatarFallback>{resolvedGuide.name.split(" ").map((p) => p[0]).slice(0,2).join("")}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-800">{resolvedGuide.name}</span>
          </div>
        ) : null}
      </div>

      <CardHeader className="space-y-3 pb-3">
        <CardTitle className="text-pretty group-hover:text-blue-700 transition-colors">{startup.name}</CardTitle>
        <div className="flex flex-wrap gap-2">
          {startup.tags.slice(0, 4).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={cn(
                "text-xs transition-all duration-300 hover:scale-105",
                isOngoing
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
              )}
            >
              {tag}
            </Badge>
          ))}
          {startup.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{startup.tags.length - 4} more
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            <span className="font-medium text-foreground">Vision:</span> {startup.ideaVision}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            <span className="font-medium text-foreground">Goal:</span> {startup.goal}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            <span className="font-medium text-foreground">Product:</span> {startup.productOverview}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground min-w-0">Guide:</span>
            <span className="text-muted-foreground truncate">{resolvedGuide?.name || startup.guide}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground min-w-0">Lead:</span>
            <span className="text-muted-foreground truncate">{resolvedLead?.name || startup.lead}</span>
          </div>
        </div>

        {isOngoing && typeof startup.progress === "number" && (
          <div className="space-y-2" aria-label="Progress">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{startup.progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000",
                )}
                style={{ width: `${Math.max(0, Math.min(100, startup.progress))}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        {/* Action buttons */}
        {(startup.videoUrl || startup.demoUrl) && (
          <div className="flex flex-col gap-2 pt-2">
            {startup.videoUrl && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full flex items-center gap-2 transition-all duration-300",
                      isOngoing ? "border-blue-600 hover:bg-blue-50" : "border-emerald-600 hover:bg-emerald-50",
                    )}
                  >
                    <Play className="h-4 w-4" />
                    {isOngoing ? "Watch Preview" : "Watch Demo"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{startup.name}</DialogTitle>
                    <DialogDescription>
                      {isOngoing ? "Preview" : "Product demo"} video for {startup.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <video
                      controls
                      preload="metadata"
                      poster={startup.posterUrl || `/startups/${startup.id}-poster.jpg`}
                      className="w-full aspect-video rounded-lg"
                    >
                      <source src={startup.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {!isOngoing && startup.demoUrl && (
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
                <a
                  href={startup.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open demo for ${startup.name}`}
                >
                  <ExternalLink className="h-4 w-4" />
                  View Free Demo
                </a>
              </Button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-2 pt-2">
          <DownloadButton href={getProjectDownloadUrl("startup", startup.id)} />
        </div>

        {/* Team members */}
        <div className="border-t pt-3">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Team ({startup.teamMembers.length})</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {startup.teamMembers.slice(0, 3).map((m) => (
              <Badge key={m} variant="outline" className="text-xs">
                {m}
              </Badge>
            ))}
            {startup.teamMembers.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{startup.teamMembers.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
