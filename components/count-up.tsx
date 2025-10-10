"use client"

import { useEffect, useRef, useState } from "react"

export function CountUp({ value, duration = 800 }: { value: number; duration?: number }) {
  const start = useRef<number>(0)
  const startTime = useRef<number | null>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    start.current = 0
    startTime.current = null
    let raf: number

    const step = (t: number) => {
      if (startTime.current == null) startTime.current = t
      const progress = Math.min(1, (t - startTime.current) / duration)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      const current = Math.round(eased * value)
      setDisplay(current)
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return <span>{display}</span>
}

export default CountUp
