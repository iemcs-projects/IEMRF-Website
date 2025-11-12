"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"

type ScrollingBannerProps = {
  text?: string
  className?: string
  speedSeconds?: number
  href?: string
}

export default function ScrollingBanner({
  text = "Apply for Winter Internship 2025 🚀| Applications are open now! | Gain Real Industrial Experience & Build Your Future Today! 🔧✨",
  className,
  speedSeconds = 28,
  href,
}: ScrollingBannerProps) {
  const Content = (
    <div
      className="relative overflow-hidden"
      aria-live="polite"
    >
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
  )

  return (
    <div
      className={cn(
        "w-full bg-blue-700 text-white py-2 md:py-2.5",
        href && "cursor-pointer hover:bg-blue-800 transition-colors duration-200",
        className,
      )}
      role="region"
      aria-label="News highlight"
    >
      {href ? (
        <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
          {Content}
        </Link>
      ) : (
        Content
      )}

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
