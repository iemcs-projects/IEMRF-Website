"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function InternshipApply() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-700 text-white hover:bg-blue-800">Open Application</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Internship Application</DialogTitle>
          <DialogDescription>Fill in the details below to apply for the internship program.</DialogDescription>
        </DialogHeader>
        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <div className="sm:col-span-1">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" name="fullName" autoComplete="name" required placeholder="Jane Doe" />
          </div>
          <div className="sm:col-span-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required placeholder="jane@university.edu" />
          </div>
          <div className="sm:col-span-1">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" />
          </div>
          <div className="sm:col-span-1">
            <Label htmlFor="institution">Institution</Label>
            <Input id="institution" name="institution" placeholder="University/Institute" />
          </div>
          <div className="sm:col-span-1">
            <Label htmlFor="degree">Degree / Program</Label>
            <Input id="degree" name="degree" placeholder="B.Tech CSE, M.Sc AI, etc." />
          </div>
          <div className="sm:col-span-1">
            <Label htmlFor="graduation">Graduation year</Label>
            <Input id="graduation" name="graduation" type="number" placeholder="2026" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="interests">Areas of interest</Label>
            <Input id="interests" name="interests" placeholder="AI/ML, Web, IoT, Energy, FinTech…" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="statement">Statement of purpose</Label>
            <Textarea id="statement" name="statement" rows={5} required placeholder="Why do you want to intern at IEMRF? What do you want to work on?" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="resume">Resume / portfolio (PDF)</Label>
            <Input id="resume" name="resume" type="file" accept="application/pdf" />
            <p className="mt-1 text-xs text-muted-foreground">Attach your resume (PDF, up to ~10MB).</p>
          </div>
          <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-700">Send Application</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}



