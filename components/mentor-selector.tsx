"use client"

import { useMemo, useRef, useState } from "react"
import { useMentorContext, type MentorInfo } from "@/components/mentor-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  projectKey: string
  role: "mentor" | "guide" | "lead"
  trigger?: React.ReactNode
}

export function MentorSelector({ projectKey, role, trigger }: Props) {
  const { assignments, setMentorFor, peopleDirectory } = useMentorContext()
  const current = assignments[projectKey]?.[role]

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [manualName, setManualName] = useState("")
  const [manualImage, setManualImage] = useState<string | undefined>(undefined)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return peopleDirectory
    return peopleDirectory.filter((p) => p.name.toLowerCase().includes(q))
  }, [peopleDirectory, query])

  const initials = (name?: string) => (name || "?").split(" ").map((p) => p[0]?.toUpperCase()).slice(0, 2).join("")

  function handleChoose(p: { id: string; name: string; image?: string }) {
    const info: MentorInfo = { id: p.id, name: p.name, image: p.image }
    setMentorFor(projectKey, role, info)
    setOpen(false)
  }

  function handleSaveManual() {
    if (!manualName.trim()) return
    const info: MentorInfo = { name: manualName.trim(), image: manualImage }
    setMentorFor(projectKey, role, info)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="h-8">
            {current ? `Edit ${role}` : `Assign ${role}`}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Select {role}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="search">Search Leadership/Team</Label>
            <Input
              id="search"
              placeholder="Type a name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="max-h-56 overflow-auto rounded border">
            {filtered.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground">No results</div>
            ) : (
              <ul className="divide-y">
                {filtered.map((p) => (
                  <li key={`${p.source}:${p.id}`} className="p-2 hover:bg-accent cursor-pointer" onClick={() => handleChoose(p)}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={p.image} alt={p.name} />
                        <AvatarFallback>{initials(p.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-[10px] uppercase text-muted-foreground">{p.source}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-medium">Or add manually</div>
            <div className="grid gap-3">
              <div className="grid gap-1">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={manualName} onChange={(e) => setManualName(e.target.value)} placeholder="Enter full name" />
              </div>
              <div className="grid gap-1">
                <Label>Profile image (optional)</Label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = () => setManualImage(typeof reader.result === "string" ? reader.result : undefined)
                    reader.readAsDataURL(file)
                  }}
                />
                {manualImage ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Image selected</span>
                    <Button variant="ghost" size="sm" onClick={() => setManualImage(undefined)}>
                      Remove
                    </Button>
                  </div>
                ) : null}
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveManual} disabled={!manualName.trim()}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



