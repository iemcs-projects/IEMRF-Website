"use client"

import React, { useEffect, useRef, useState } from "react"
import useSWR from "swr"
import { useRouter, useSearchParams } from "next/navigation"
import { upcomingEvents, pastEvents, type EventItem } from "@/lib/events-data"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type TickerItem = {
  id: string
  type: "news" | "event"
  title: string
  date?: string
  summary?: string
}

export default function NewsEventsTicker({ speed = 18, height = 520 }: { speed?: number; height?: number }) {
  // This component was removed from the hero. Keep a minimal placeholder in case it's imported elsewhere.
  return null
}

  // duplicate for seamless looping
  const displayed = [...items, ...items]

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function step(ts: number) {
      const cur = containerRef.current
      if (!cur) {
        lastTimeRef.current = ts
        rafRef.current = requestAnimationFrame(step)
        return
      }
      if (pausedRef.current) {
        lastTimeRef.current = ts
        rafRef.current = requestAnimationFrame(step)
        return
      }
      if (!lastTimeRef.current) lastTimeRef.current = ts
      const delta = ts - lastTimeRef.current
      lastTimeRef.current = ts
      const px = (speed * delta) / 1000
      // move the scrollTop
      cur.scrollTop = cur.scrollTop + px
      if (cur.scrollTop >= cur.scrollHeight / 2) {
        cur.scrollTop = cur.scrollTop - cur.scrollHeight / 2
      }
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current)
    }
  }, [speed, displayed.length])

  // pause on hover / touch / focus
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onEnter = () => {
      pausedRef.current = true
    }
    const onLeave = () => {
      pausedRef.current = false
    }
    const onWheel = (e: WheelEvent) => {
      // pause and allow manual scroll
      pausedRef.current = true
      if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current)
      // apply manual scroll
      el.scrollTop += e.deltaY
      resumeTimeout.current = window.setTimeout(() => (pausedRef.current = false), 1200)
      e.preventDefault()
    }
    const onTouchStart = () => {
      pausedRef.current = true
      if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current)
    }
    const onTouchEnd = () => {
      resumeTimeout.current = window.setTimeout(() => (pausedRef.current = false), 1200)
    }
    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)
    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  const handleClick = (item: TickerItem) => {
    // use query param as requested
    if (item.type === "news") {
      router.push(`/news?selected=${encodeURIComponent(item.id)}`)
    } else {
      router.push(`/events?selected=${encodeURIComponent(item.id)}`)
    }
  }

  return (
    <aside className="hidden lg:block">
      <div
        className="w-40 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg p-3 z-40"
        style={{ height, maxHeight: height }}
        aria-label="News and Events ticker"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">News & Events</h3>
          <span className="text-xs text-gray-500">Latest</span>
        </div>
        <p className="text-xs text-gray-600 mt-1 mb-2">Hover to pause • Scroll to browse</p>

        <div
          ref={containerRef}
          className="relative overflow-y-auto overflow-x-hidden pt-1 h-full pr-1 scroll-area"
          tabIndex={0}
          role="list"
        >
          <div className="flex flex-col gap-3">
            {displayed.map((it, idx) => {
              const isSelected = selected === it.id
              return (
                <button
                  key={`${it.id}-${idx}`}
                  onClick={() => handleClick(it)}
                  className={`group w-full text-left rounded-xl border p-3 bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 transition-transform duration-200 transform-gpu ${isSelected ? 'scale-[1.02] border-amber-400 shadow-xl' : 'hover:scale-[1.01] hover:shadow-md'}`}
                  title={`${it.type === "news" ? "News" : "Event"}: ${it.title}`}
                  aria-label={`${it.type} ${it.title}`}
                  style={{ minHeight: 72, paddingTop: 12, paddingBottom: 12 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${it.type === 'news' ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'}`}>
                        {it.type === 'news' ? 'News' : 'Event'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">{it.title}</div>
                      {it.date && <div className="text-xs text-gray-500 mt-1">{new Date(it.date).toLocaleDateString()}</div>}
                      {it.summary && <div className="text-xs text-gray-600 mt-1 line-clamp-2">{it.summary}</div>}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <style jsx>{`
          /* hide scrollbar but keep scrollability */
          .scroll-area::-webkit-scrollbar { display: none; }
          .scroll-area { -ms-overflow-style: none; scrollbar-width: none; }
          @media (prefers-reduced-motion: reduce) {
            .transition-transform { transition: none !important; }
          }
        `}</style>
      </div>

      {/* Mobile fallback: collapsible, appears below hero on small screens */}
    </aside>
  )
}
