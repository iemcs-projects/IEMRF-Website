"use client"

import useSWR from "swr"
import { useState, useEffect } from "react"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type NewsItem = {
  id: string
  title: string
  date: string
  summary: string
}

export function NewsList() {
  const { data, error, isLoading } = useSWR<{ news: NewsItem[] }>("/api/news", fetcher)
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (data?.news) {
      data.news.forEach((item, index) => {
        setTimeout(() => {
          setAnimatedItems((prev) => new Set([...prev, item.id]))
        }, index * 200)
      })
    }
  }, [data?.news])

  if (error) return <div className="text-sm text-red-600">Failed to load news.</div>
  if (isLoading) return <SkeletonList />
  if (!data?.news?.length) return <div className="text-sm text-gray-600">No news available.</div>

  return (
    <>
      <ul className="space-y-5">
        {data.news.map((n, index) => {
          const isCurrent = index === 0
          const paletteIndex = isCurrent ? 0 : index % 3
          const isBlue = paletteIndex === 0
          const isEmerald = paletteIndex === 1
          const isPurple = paletteIndex === 2
          const accent = isCurrent ? "#f97316" : isBlue ? "#3b82f6" : isEmerald ? "#10b981" : "#8b5cf6"
          const accentSoft = isCurrent ? "#fdba74" : isBlue ? "#93c5fd" : isEmerald ? "#6ee7b7" : "#d8b4fe"
          const gradient = isCurrent
            ? "linear-gradient(135deg, #fff7ed 0%, #fed7aa 35%, #fff5eb 100%)"
            : isBlue
            ? "linear-gradient(135deg, #fff 0%, #dbeafe 35%, #eff6ff 100%)"
            : isEmerald
            ? "linear-gradient(135deg, #fff 0%, #d1fae5 35%, #ecfeff 100%)"
            : "linear-gradient(135deg, #fff 0%, #ede9fe 35%, #f5f3ff 100%)"
          const blinkClass = isCurrent ? "animate-blink-fast" : "animate-blink"
          const readMoreLink = n.id === "winter-internship" ? "/internship?highlight=apply" : undefined
          return (
            <li
              key={n.id}
              id={n.id}
              className={`relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all duration-500 will-change-transform ${
                animatedItems.has(n.id)
                  ? "opacity-100 translate-y-0 animate-pop-in"
                  : "opacity-0 translate-y-4"
              } hover:-translate-y-1 hover:shadow-lg`}
              style={{
                background: gradient,
                borderLeft: `4px solid ${accent}`,
              }}
            >
              {/* shimmering border accent */}
              <div
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  boxShadow: `inset 0 0 0 1px ${accent}22`,
                }}
                aria-hidden="true"
              />

              {/* animated diagonal sheen */}
              <div
                className="pointer-events-none absolute -inset-y-8 -left-1/2 w-1/2 rotate-12 bg-white/30 blur-xl animate-sheen"
                aria-hidden="true"
              />

              {/* blinking corner dot */}
              <span
                className={`pointer-events-none absolute -top-1 -right-1 h-2 w-2 rounded-full ${
                  isCurrent ? "bg-orange-500" : isBlue ? "bg-blue-500" : isEmerald ? "bg-emerald-500" : "bg-purple-500"
                } ${blinkClass}`}
                aria-hidden="true"
              />

              {/* floating sparkle */}
              <span
                className={`pointer-events-none absolute -bottom-3 left-4 h-2 w-2 rounded-full ${
                  isBlue ? "bg-blue-400" : isEmerald ? "bg-emerald-400" : "bg-purple-400"
                } blur-[1px] animate-sparkle`}
                aria-hidden="true"
              />

              <div className="mb-2 flex items-center gap-2 text-xs text-gray-600">
                <div
                  className={`h-2 w-2 rounded-full ${
                    isCurrent ? "bg-orange-500" : isBlue ? "bg-blue-500" : isEmerald ? "bg-emerald-500" : "bg-purple-500"
                  } ${isCurrent ? "animate-pulse-fast" : "animate-pulse"}`}
                />
                <span>{new Date(n.date).toDateString()}</span>
                <span
                  className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                  style={{
                    background: `linear-gradient(90deg, ${accent} 0%, ${accentSoft} 100%)`,
                    boxShadow: `0 4px 12px ${accent}44`,
                  }}
                >
                  {isCurrent ? "Ongoing" : "Update"}
                </span>
              </div>
              <h3
                className="mb-2 text-lg font-extrabold transition-colors"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${accent}, ${accentSoft})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {n.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{n.summary}</p>
              {readMoreLink ? (
                <Link
                  href={readMoreLink}
                  className="mt-3 inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
                >
                  Read more →
                </Link>
              ) : (
                <span className="mt-3 inline-flex items-center text-xs font-medium text-blue-600">Read more →</span>
              )}

              {/* glow ring on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100"
                style={{
                  boxShadow: `0 0 0 6px ${accent}1a inset`,
                }}
                aria-hidden="true"
              />
            </li>
          )
        })}
      </ul>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-pop-in, .animate-blink, .animate-sparkle { animation: none !important; }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: translateY(12px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-pop-in { animation: pop-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes blink { 0%, 100% { opacity: .3; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.25); } }
        @keyframes blink-fast { 0%, 100% { opacity: .2; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.35); } }
        .animate-blink { animation: blink 1.8s ease-in-out infinite; }
        .animate-blink-fast { animation: blink-fast 1.1s ease-in-out infinite; }
        @keyframes pulse-fast { 0%, 100% { opacity: .5; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.1); } }
        .animate-pulse-fast { animation: pulse-fast 1.4s ease-in-out infinite; }
        @keyframes sparkle { 0% { transform: translateY(0) scale(1); opacity:.8 } 50% { transform: translateY(-6px) scale(1.2); opacity:1 } 100% { transform: translateY(0) scale(1); opacity:.8 } }
        .animate-sparkle { animation: sparkle 2.2s ease-in-out infinite; }
        @keyframes sheen { 0% { transform: translateX(-120%) rotate(12deg); } 100% { transform: translateX(180%) rotate(12deg); } }
        .animate-sheen { animation: sheen 2.6s ease-in-out infinite; }
      `}</style>
    </>
  )
}

function SkeletonList() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-24 animate-pulse rounded-lg border bg-gradient-to-r from-gray-100 to-gray-200" />
      ))}
    </div>
  )
}
