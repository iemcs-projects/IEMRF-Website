"use client"

import { solutions } from "@/lib/solutions-data"
import { SolutionCard } from "./solution-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SolutionsContent() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">Our Solutions</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Explore our comprehensive suite of solutions tailored to support innovation, entrepreneurship, research commercialization, and organizational growth.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
