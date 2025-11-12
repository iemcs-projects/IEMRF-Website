"use client"

import { useEffect, useRef, useState } from "react"

export function CountUp({ value, end, duration = 0.8 }: { value?: number; end?: number; duration?: number }) {
  const targetValue = end ?? value ?? 0
  const start = useRef<number>(0)
  const startTime = useRef<number | null>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    start.current = 0
    startTime.current = null
    setDisplay(0)
    let raf: number

    const step = (t: number) => {
      if (startTime.current == null) startTime.current = t
      // Duration is in seconds, convert to milliseconds
      const durationMs = duration * 1000
      const progress = Math.min(1, (t - startTime.current) / durationMs)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      const current = Math.round(eased * targetValue)
      setDisplay(current)
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setDisplay(targetValue)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [targetValue, duration])

  return <span>{display}</span>
}

export default CountUp
