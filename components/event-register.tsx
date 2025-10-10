"use client"

import { useState } from "react"

export function EventRegisterForm() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <form className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
      <input className="rounded border px-3 py-2 text-sm" placeholder="Full name" required />
      <input className="rounded border px-3 py-2 text-sm" placeholder="Email" type="email" required />
      <input className="rounded border px-3 py-2 text-sm sm:col-span-2" placeholder="Organization (optional)" />
      <textarea className="rounded border px-3 py-2 text-sm sm:col-span-2" rows={4} placeholder="What interests you about this event?" />
      <div className="sm:col-span-2">
        <button className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">{submitted ? "Submitted" : "Submit"}</button>
      </div>
    </form>
  )
}


