import React, { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import EventsClient from "@/components/events-client"

export default function EventsPage() {
  return (
    <main>
      <SiteHeader />
      <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-12">Loading events…</div>}>
        <EventsClient />
      </Suspense>
      <SiteFooter />
    </main>
  )
}


