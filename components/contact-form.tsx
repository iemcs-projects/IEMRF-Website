"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [values, setValues] = useState({ name: "", email: "", message: "" })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const json = await res.json()
      if (res.ok && json.ok) {
        toast({ title: "Thanks!", description: "We received your message and will respond shortly." })
        setValues({ name: "", email: "", message: "" })
      } else if (json && json.mailto) {
        // SMTP not configured on server or send failed — open user's mail client
        const to = "iem.industryconsulting@gmail.com"
        const subject = `Contact from ${values.name || "Website visitor"}`
        const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
        const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        // Open mail client for user to send from their own email account
        window.location.href = mailto
        toast({ title: "Open mail client", description: "Your email client will open so you can send the message." })
        setValues({ name: "", email: "", message: "" })
      } else {
        throw new Error(json?.error || "Submission failed")
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Something went wrong." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900">Name</label>
        <input
          aria-label="Name"
          required
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className="mt-1 w-full rounded border px-3 py-2 text-sm text-gray-900"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Email</label>
        <input
          aria-label="Email"
          type="email"
          required
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          className="mt-1 w-full rounded border px-3 py-2 text-sm text-gray-900"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Message</label>
        <textarea
          aria-label="Message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className="mt-1 w-full rounded border px-3 py-2 text-sm text-gray-900"
          placeholder="Tell us about your idea or partnership proposal..."
        />
      </div>
      <Button type="submit" disabled={loading} className="bg-blue-700 text-white hover:bg-blue-800">
        {loading ? "Sending..." : "Send message"}
      </Button>
    </form>
  )
}
