"use client"

import React from "react"
import { partners } from "@/lib/data"

type Props = {
  speedSeconds?: number
  logoSize?: number | string
}

export default function PartnersMarquee({ speedSeconds = 20, logoSize = 120 }: Props) {
  // Duplicate the list so the animation can loop seamlessly
  const items = [...partners, ...partners]

  // Convert numeric logoSize to px string for inline styles
  const size = typeof logoSize === "number" ? `${logoSize}px` : logoSize

  return (
    <div className="w-full overflow-hidden" role="region" aria-label="Partners logos">
      <div className="relative">
        <div
          className="marquee-track will-change-transform"
          style={{ animation: `marquee linear infinite`, animationDuration: `${speedSeconds}s` }}
        >
          {items.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="partner-card flex flex-col items-center justify-center rounded-2xl border bg-white shadow-sm p-3 transition-transform duration-300 hover:-translate-y-1"
              style={{ width: size }}
              title={p.name}
            >
              <div className="partner-logo flex items-center justify-center" style={{ width: size, height: size }}>
                <img src={p.image || "/placeholder.svg"} alt={p.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="partner-name mt-2 text-center text-sm font-medium text-gray-700">{p.name}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}
