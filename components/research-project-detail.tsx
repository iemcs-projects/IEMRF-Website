"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download, Calendar, Users, DollarSign, ExternalLink, ArrowLeft } from "lucide-react"
import type { ResearchProject } from "@/lib/research-data"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { findPersonByName } from "@/lib/people"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { leadershipTeam } from "@/lib/leadership-data"
import { teamMembers } from "@/lib/team-data"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type Props = {
  project: ResearchProject
}

const statusColor: Record<ResearchProject["status"], string> = {
  ongoing: "bg-emerald-500 text-white",
  completed: "bg-blue-700 text-white",
}

export function ResearchProjectDetail({ project }: Props) {
  // Resolve person metadata (handles titles like Dr./Prof.)
  const mentors = project.mentor || []
  const resolvedMentors = mentors.map(m => findPersonByName(m))
  const resolvedLead = project.lead ? findPersonByName(project.lead) : null
  const developers = project.developer ? (Array.isArray(project.developer) ? project.developer : [project.developer]) : []
  const resolvedDevelopers = developers.map(d => findPersonByName(d))
  const team = project.team || project.teamMembers || []

  // Find the full profile data from leadership or team using resolved ids when possible
  const allProfiles = [...leadershipTeam, ...teamMembers]
  const mentorProfiles = resolvedMentors.map((resolved, idx) => 
    resolved ? allProfiles.find((p) => p.id === resolved.id) : allProfiles.find((p) => p.name.toLowerCase() === mentors[idx]?.toLowerCase())
  ).filter(Boolean)
  const leadProfile = resolvedLead 
    ? allProfiles.find((p) => p.id === resolvedLead.id) 
    : (project.lead ? allProfiles.find((p) => p.name.toLowerCase() === (project.lead as string).toLowerCase()) : null) as typeof allProfiles[0] | undefined
  const developerProfiles = resolvedDevelopers.map((resolved, idx) =>
    resolved ? allProfiles.find((p) => p.id === resolved.id) : allProfiles.find((p) => p.name.toLowerCase() === developers[idx]?.toLowerCase())
  ).filter(Boolean)

  const [mentorDialogOpen, setMentorDialogOpen] = useState<number | null>(null)
  const [leadDialogOpen, setLeadDialogOpen] = useState(false)
  const [developerDialogOpen, setDeveloperDialogOpen] = useState<number | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const visuals = project.visuals || []

  const handleDownload = async () => {
    // If there's a registered PPT for this project, download it directly from public path
    try {
      const { getPptForProject } = await import("@/lib/research-downloads")
      const ppt = getPptForProject(project.id, project.title)
      if (ppt) {
        const link = document.createElement("a")
        link.href = ppt
        // Keep the original filename if present, otherwise create one
        const parts = ppt.split("/")
        link.download = parts[parts.length - 1] || `${project.id}-details.pptx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        return
      }
    } catch (err) {
      console.warn("Could not check PPT mapping:", err)
    }

    // Fallback: generate a PDF of the research project page
    try {
      const { downloadPagePdf } = await import("@/components/download-utils")
      const safeFileName = `${project.title.replace(/\s+/g, "-").toLowerCase()}-details.pdf`
      await downloadPagePdf(`/research/${project.id}`, safeFileName)
    } catch (err) {
      console.error("Download failed:", err)
      // As a last fallback, offer JSON data export
      const projectData = {
        ...project,
        downloadDate: new Date().toISOString(),
      }

      const dataStr = JSON.stringify(projectData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${project.id}-research-details.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  // If the page is opened with ?download=1, trigger the download flow
  // and then clean the URL so users don't see the query param.
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const searchParams = new URLSearchParams(window.location.search)
    const downloadParam = searchParams.get("download")
    
    if (downloadParam) {
      ;(async () => {
        try {
          await handleDownload()
        } catch (e) {
          console.error("Auto-download failed:", e)
        } finally {
          // Clean up the URL by removing the download query param
          window.history.replaceState({}, document.title, `/research/${project.id}`)
        }
      })()
    }
  }, [project.id])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/research">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Research
          </Button>
        </Link>
      </div>

      {/* Project Header */}
      <div className="space-y-6">
        {project.image && (
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">{project.area}</Badge>
            <Badge className={cn("", statusColor[project.status])}>
              {project.status === "ongoing" ? "Ongoing" : "Completed"}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-pretty">{project.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {/* Mentors */}
            {mentors.length > 0 && mentors.map((mentor, idx) => {
              const resolved = resolvedMentors[idx]
              const profile = mentorProfiles[idx]
              return (
                <div key={idx} className="flex items-center gap-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Avatar onClick={() => setMentorDialogOpen(idx)} className="h-5 w-5 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all">
                        <AvatarImage src={resolved?.image} alt={mentor} />
                        <AvatarFallback>{mentor.split(" ").map((p: string) => p[0]).join("")}</AvatarFallback>
                      </Avatar>
                    </HoverCardTrigger>
                    {profile && (
                      <HoverCardContent side="right" align="start" className="w-80 p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={profile.image} alt={profile.name} />
                            <AvatarFallback>{profile.name.split(" ").map((p: string) => p[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{profile.name}</h4>
                            <p className="text-xs text-blue-600 mb-2">{profile.role}</p>
                            <p className="text-xs text-muted-foreground line-clamp-3">{profile.bio}</p>
                            <div className="mt-3 flex gap-2">
                              {profile.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1">
                                  <ExternalLink className="h-3 w-3" /> LinkedIn
                                </a>
                              )}
                              <Link href={profile ? `/about#${profile.id}` : "/about#leadership-team"} className="text-xs text-blue-600 hover:underline">Learn More</Link>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    )}
                  </HoverCard>
                  {profile && (
                    <Dialog open={mentorDialogOpen === idx} onOpenChange={(open) => setMentorDialogOpen(open ? idx : null)}>
                      <DialogContent>
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={profile.image} alt={profile.name} />
                            <AvatarFallback>{profile.name.split(" ").map((p: string) => p[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{profile.name}</h4>
                            <p className="text-xs text-blue-600 mb-2">{profile.role}</p>
                            <p className="text-xs text-muted-foreground">{profile.bio}</p>
                            <div className="mt-3 flex gap-2">
                              {profile.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1">
                                  <ExternalLink className="h-3 w-3" /> LinkedIn
                                </a>
                              )}
                              <Link href={profile ? `/about#${profile.id}` : "/about#leadership-team"} className="text-xs text-blue-600 hover:underline">Learn More</Link>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  <span>Mentor{mentors.length > 1 ? ` ${idx + 1}` : ''}: {resolved?.name || mentor}</span>
                </div>
              )
            })}

            {/* Lead */}
            {project.lead && (
              <div className="flex items-center gap-2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Avatar onClick={() => setLeadDialogOpen(true)} className="h-5 w-5 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all">
                      <AvatarImage src={resolvedLead?.image} alt={project.lead} />
                      <AvatarFallback>{project.lead.split(" ").map((p: string) => p[0]).join("")}</AvatarFallback>
                    </Avatar>
                  </HoverCardTrigger>
                  {leadProfile && (
                    <HoverCardContent side="right" align="start" className="w-80 p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={leadProfile.image} alt={leadProfile.name} />
                          <AvatarFallback>{leadProfile.name.split(" ").map((p: string) => p[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{leadProfile.name}</h4>
                          <p className="text-xs text-blue-600 mb-2">{leadProfile.role}</p>
                          <p className="text-xs text-muted-foreground line-clamp-3">{leadProfile.bio}</p>
                          <div className="mt-3 flex gap-2">
                            {leadProfile.linkedin && (
                              <a href={leadProfile.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" /> LinkedIn
                              </a>
                            )}
                            <Link href={leadProfile ? `/about#${leadProfile.id}` : "/about#team"} className="text-xs text-blue-600 hover:underline">Learn More</Link>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  )}
                </HoverCard>
                {leadProfile && (
                  <Dialog open={leadDialogOpen} onOpenChange={setLeadDialogOpen}>
                    <DialogContent>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={leadProfile.image} alt={leadProfile.name} />
                          <AvatarFallback>{leadProfile.name.split(" ").map((p: string) => p[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{leadProfile.name}</h4>
                          <p className="text-xs text-blue-600 mb-2">{leadProfile.role}</p>
                          <p className="text-xs text-muted-foreground">{leadProfile.bio}</p>
                          <div className="mt-3 flex gap-2">
                            {leadProfile.linkedin && (
                              <a href={leadProfile.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" /> LinkedIn
                              </a>
                            )}
                            <Link href={leadProfile ? `/about#${leadProfile.id}` : "/about#team"} className="text-xs text-blue-600 hover:underline">Learn More</Link>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <span>Lead: {resolvedLead?.name || project.lead}</span>
              </div>
            )}

            {/* Developers */}
            {developers.length > 0 && developers.map((developer, idx) => {
              const resolved = resolvedDevelopers[idx]
              const profile = developerProfiles[idx]
              return (
                <div key={idx} className="flex items-center gap-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Avatar onClick={() => setDeveloperDialogOpen(idx)} className="h-5 w-5 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all">
                        <AvatarImage src={resolved?.image} alt={developer} />
                        <AvatarFallback>{developer.split(" ").map((p: string) => p[0]).join("")}</AvatarFallback>
                      </Avatar>
                    </HoverCardTrigger>
                    {profile && (
                      <HoverCardContent side="right" align="start" className="w-80 p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={profile.image} alt={profile.name} />
                            <AvatarFallback>{profile.name.split(" ").map((p: string) => p[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{profile.name}</h4>
                            <p className="text-xs text-blue-600 mb-2">{profile.role}</p>
                            <p className="text-xs text-muted-foreground line-clamp-3">{profile.bio}</p>
                            <div className="mt-3 flex gap-2">
                              {profile.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1">
                                  <ExternalLink className="h-3 w-3" /> LinkedIn
                                </a>
                              )}
                              <Link href={profile ? `/about#${profile.id}` : "/about#team"} className="text-xs text-blue-600 hover:underline">Learn More</Link>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    )}
                  </HoverCard>
                  {profile && (
                    <Dialog open={developerDialogOpen === idx} onOpenChange={(open) => setDeveloperDialogOpen(open ? idx : null)}>
                      <DialogContent>
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={profile.image} alt={profile.name} />
                            <AvatarFallback>{profile.name.split(" ").map((p: string) => p[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{profile.name}</h4>
                            <p className="text-xs text-blue-600 mb-2">{profile.role}</p>
                            <p className="text-xs text-muted-foreground">{profile.bio}</p>
                            <div className="mt-3 flex gap-2">
                              {profile.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1">
                                  <ExternalLink className="h-3 w-3" /> LinkedIn
                                </a>
                              )}
                              <Link href={profile ? `/about#${profile.id}` : "/about#team"} className="text-xs text-blue-600 hover:underline">Learn More</Link>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  <span>Developer{developers.length > 1 ? ` ${idx + 1}` : ''}: {resolved?.name || developer}</span>
                </div>
              )
            })}

            {/* Team */}
            {team.length > 0 && (
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>Team: {team.join(', ')}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
            </div>
            {project.budget && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Budget: {project.budget}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Details
        </Button>
        {project.links?.map((link) => (
          <Button key={link.url} variant="outline" asChild>
            <a href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              {link.label}
            </a>
          </Button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Project Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{project.description || project.overview}</p>
            </CardContent>
          </Card>

          {/* Methodology */}
          {project.methodology && project.methodology.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Methodology</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {project.methodology.map((step, i) => (
                    <li key={i} className="text-sm">
                      {step}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Results & Findings */}
          <Card>
            <CardHeader>
              <CardTitle>Key Results & Findings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.results && project.results.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {project.results.map((result, i) => (
                    <li key={i} className="text-sm">
                      {result}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="list-disc pl-5 space-y-2">
                  {project.keyFindings.map((finding, i) => (
                    <li key={i} className="text-sm">
                      {finding}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={project.metrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" name="Accuracy %" />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="#10b981"
                        name="Efficiency %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Challenges & Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {project.challenges.map((challenge, i) => (
                    <li key={i} className="text-sm">
                      {challenge}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Future Work */}
          {project.futureWork && project.futureWork.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Future Work</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {project.futureWork.map((point, i) => (
                    <li key={i} className="text-sm">
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Visuals / Project Snaps */}
          {project.visuals && project.visuals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Visuals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Primary large media */}
                  <div className="w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
                    {visuals[0].type === 'video' ? (
                      <video
                        src={visuals[0].src}
                        controls
                        className="w-full h-full object-contain rounded-md"
                      />
                    ) : (
                      <img
                        src={visuals[0].src}
                        alt={visuals[0].caption || project.title}
                        className="w-full h-full object-contain rounded-md cursor-zoom-in hover:scale-105 transition-transform duration-300"
                        onClick={() => {
                          setPreviewSrc(visuals[0].src)
                          setPreviewOpen(true)
                        }}
                      />
                    )}
                    {visuals[0].caption && (
                      <div className="text-sm text-muted-foreground mt-3 px-1">
                        {visuals[0].caption}
                      </div>
                    )}
                  </div>

                  {/* Thumbnails for remaining images */}
                  {visuals.length > 1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {visuals.slice(1).map((v, i) => (
                        <div key={i} className="aspect-square relative overflow-hidden rounded-md bg-gray-100 group">
                          {v.type === 'video' ? (
                            <video
                              src={v.src}
                              className="w-full h-full object-cover cursor-pointer"
                              onClick={() => {
                                setPreviewSrc(v.src)
                                setPreviewOpen(true)
                              }}
                            />
                          ) : (
                            <img
                              src={v.src}
                              alt={v.caption || `${project.title} snap ${i + 2}`}
                              className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
                              onClick={() => {
                                setPreviewSrc(v.src)
                                setPreviewOpen(true)
                              }}
                            />
                          )}
                          {v.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                              {v.caption}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Preview dialog */}
                  <Dialog open={!!previewOpen} onOpenChange={(open) => { if (!open) { setPreviewSrc(null); setPreviewOpen(false) } }}>
                    <DialogContent className="max-w-4xl">
                      <div className="relative w-full aspect-[4/3]">
                        {previewSrc && (
                          visuals.find(v => v.src === previewSrc)?.type === 'video' ? (
                            <video 
                              src={previewSrc}
                              controls
                              autoPlay
                              className="w-full h-full object-contain bg-gray-100 rounded-lg"
                            />
                          ) : (
                            <img 
                              src={previewSrc} 
                              alt={project.title} 
                              className="w-full h-full object-contain bg-gray-100 rounded-lg"
                            />
                          )
                        )}
                      </div>
                      {visuals.find(v => v.src === previewSrc)?.caption && (
                        <div className="text-sm text-muted-foreground mt-2 text-center">
                          {visuals.find(v => v.src === previewSrc)?.caption}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium">Duration</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(project.startDate).toLocaleDateString()} -{" "}
                  {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Ongoing"}
                </div>
              </div>

              {project.fundingSource && (
                <div>
                  <div className="text-sm font-medium">Funding Source</div>
                  <div className="text-sm text-muted-foreground">{project.fundingSource}</div>
                </div>
              )}

              {project.teamMembers && (
                <div>
                  <div className="text-sm font-medium">Team Members</div>
                  <div className="text-sm text-muted-foreground">
                    {project.teamMembers.join(", ")}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Use Cases */}
          {project.useCases && project.useCases.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {project.useCases.map((uc, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 border"
                    >
                      <div className="text-2xl">✨</div>
                      <span className="mt-2 text-sm font-medium">{uc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Project Milestones */}
          {project.milestones && project.milestones.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.milestones.map((milestone, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{milestone.milestone}</span>
                      <span>{milestone.progress}%</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
