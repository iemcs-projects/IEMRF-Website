"use client"

import Image from "next/image"
import Link from "next/link"
import type { Program } from "@/lib/programs-data"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DownloadButton from "@/components/download-button"
import { getProjectDownloadUrl } from "@/lib/downloads"
import { findPersonByName } from "@/lib/people"

const categoryColor: Record<Program["category"], string> = {
  Incubation: "border-emerald-500",
  Research: "border-blue-700",
  Mentorship: "border-emerald-500",
  Workshop: "border-blue-700",
  Event: "border-blue-700",
}

export function ProgramCard({ program, floatDelay = 0 }: { program: Program; floatDelay?: number }) {
  const [imageIndex, setImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const resolvedMentor = findPersonByName(program.mentor)

  const dynamicImages = [
    program.image || "/placeholder.svg",
    `/programs/${program.id}-alt1.jpg`,
    `/programs/${program.id}-alt2.jpg`,
  ]

  useEffect(() => {
    if (!isHovered) return
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % dynamicImages.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [isHovered, dynamicImages.length])

  return (
    <article
      className={cn(
        "group relative rounded-lg border bg-white shadow-sm transition-all duration-500",
        "hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-100/50",
        "border-gray-200 overflow-hidden",
      )}
      style={{ animation: `popIn 500ms ease both`, animationDelay: `${Math.min(floatDelay, 400)}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setImageIndex(0)
      }}
    >
      <div
        className={cn(
          "absolute -top-2 -right-2 h-8 w-8 rounded-full opacity-30 blur-sm transition-all duration-500",
          "group-hover:translate-y-[-6px] group-hover:scale-110 group-hover:opacity-50",
          program.category === "Research" ? "bg-blue-500" : "bg-emerald-500",
        )}
        aria-hidden="true"
        style={{ animation: `float 8s ease-in-out infinite`, animationDelay: `${floatDelay}ms` }}
      />

      <div className={cn("h-48 w-full overflow-hidden rounded-t-lg border-b relative", "border-gray-200")}>
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          aria-hidden="true"
        />

        <div className="relative h-full w-full">
          {dynamicImages.map((img, idx) => (
            <Image
              key={idx}
              src={img || "/placeholder.svg"}
              alt={`${program.title} image ${idx + 1}`}
              width={800}
              height={384}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                "group-hover:scale-110",
                idx === imageIndex ? "opacity-100" : "opacity-0",
              )}
              crossOrigin="anonymous"
              onError={(e) => {
                if (idx > 0) {
                  e.currentTarget.src = program.image || "/placeholder.svg"
                }
              }}
            />
          ))}
        </div>

        {null}

        {isHovered && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
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
      </div>

      <div className={cn("border-l-4 p-4 relative", categoryColor[program.category])}>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, ${program.category === "Research" ? "#3b82f6" : "#10b981"} 0%, transparent 50%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-600 group-hover:text-gray-800 transition-colors">
              {program.category}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-300",
                program.status === "Open"
                  ? "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 group-hover:scale-105"
                  : "bg-gray-100 text-gray-600 group-hover:bg-gray-200",
              )}
            >
              {program.status}
            </span>
          </div>

          <h3 className="mb-1 text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
            {program.title}
          </h3>
          <p className="mb-3 text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
            {program.description}
          </p>

          <ul className="mb-4 grid list-disc gap-1 pl-5 text-sm text-gray-700">
            {program.highlights.slice(0, 3).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-600">
            <span className="rounded bg-gray-50 px-2 py-1">Duration: {program.duration}</span>
            <span className="rounded bg-gray-50 px-2 py-1">Mode: {program.mode}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {(program.tags || []).slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded border border-gray-200 px-2 py-0.5 text-xs text-gray-600 group-hover:border-blue-300 group-hover:bg-blue-50 transition-all duration-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <Link
              href={`/programs/${program.id}`}
              className="text-sm font-medium text-blue-700 underline-offset-2 hover:underline group-hover:text-blue-800 transition-colors flex items-center gap-1"
            >
              Learn more
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
              <span className="sr-only"> about {program.title}</span>
            </Link>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2">
            <DownloadButton
              onClick={async () => {
                try {
                  const { downloadProgramPdf } = await import("@/components/download-utils")
                  await downloadProgramPdf(program.id, program.title)
                } catch (err) {
                  console.error("Failed to download program PDF", err)
                  // fallback: try opening canonical download URL
                  try {
                    const url = getProjectDownloadUrl("program", program.id)
                    const a = document.createElement("a")
                    a.href = url
                    a.download = url.split("/").pop() || `${program.id}-details.pdf`
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                  } catch (e) {
                    console.error("Fallback download failed", e)
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-4px) rotate(1deg);
          }
          66% {
            transform: translateY(-2px) rotate(-1deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </article>
  )
}

export default ProgramCard
