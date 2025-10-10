import Image from "next/image"
import { partners } from "@/lib/home-data"

export default function HomeTrustbar() {
  return (
    <section aria-label="Trusted by partners and institutions" className="border-t border-b bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">Trusted by partners and institutions</p>
        <div className="mt-4 grid grid-cols-2 items-center justify-items-center gap-6 md:grid-cols-4">
          {partners.map((p) => (
            <div key={p.name} className="opacity-80 transition-opacity hover:opacity-100">
              <Image
                src={`/abstract-geometric-shapes.png?height=36&width=120&query=${encodeURIComponent(p.name + " logo")}`}
                alt={p.logoAlt}
                width={120}
                height={36}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
