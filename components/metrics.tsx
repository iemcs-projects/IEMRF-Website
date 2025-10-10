"use client"

import { useEffect, useRef, useState } from "react"

type Metric = {
  label: string
  value: number
  suffix?: string
}

export function Metrics({ items }: { items: Metric[] }) {
  const [start, setStart] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setStart(true)
        io.disconnect()
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
      {items.map((m) => (
        <Counter key={m.label} label={m.label} value={m.value} suffix={m.suffix} start={start} />
      ))}
    </div>
  )
}

function Counter({ label, value, suffix, start }: { label: string; value: number; suffix?: string; start: boolean }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!start) return
    let raf: number
    const duration = 900
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value])

  return (
    <div className="rounded border p-4">
      <div className="text-3xl font-semibold text-blue-700">
        {n.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
    </div>
  )
}
