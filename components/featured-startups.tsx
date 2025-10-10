import Link from "next/link"
import { featuredStartups } from "@/lib/home-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturedStartups() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-balance text-2xl font-semibold text-foreground md:text-3xl">Featured Startups</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">A glimpse of teams turning research into products.</p>
        </div>
        <Link href="/startups" className="text-sm font-medium text-blue-700 hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featuredStartups.map((s) => (
          <Link key={s.name} href={s.href} className="group">
            <Card className="h-full border transition-shadow group-hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{s.name}</CardTitle>
                <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/20">{s.tag}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.blurb}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
