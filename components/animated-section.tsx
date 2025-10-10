"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(true), delay)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      )}
    >
      {children}
    </div>
  )
}

export default AnimatedSection
