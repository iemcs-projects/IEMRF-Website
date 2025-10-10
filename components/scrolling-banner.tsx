"use client"
import { cn } from "@/lib/utils"

type ScrollingBannerProps = {
  text?: string
  className?: string
  speedSeconds?: number
}

export default function ScrollingBanner({
  text = "Over seventy IEMRF students successfully completed their summer internships—contributing to real-world research, building prototypes, and collaborating with mentors and startup founders to turn ideas into impact.",
  className,
  speedSeconds = 28,
}: ScrollingBannerProps) {
  return (
    <div
      className={cn("w-full bg-blue-700 text-white py-2 md:py-2.5", className)}
      role="region"
      aria-label="Internship highlight"
    >
      <div className="relative overflow-hidden">
        <div
          className="whitespace-nowrap will-change-transform"
          style={{
            animation: `scroll-once linear infinite`,
            animationDuration: `${speedSeconds}s`,
          }}
        >
          <span className="inline-block px-4 text-sm md:text-base font-medium">{text}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-once {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [role="region"] > div > div {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}
