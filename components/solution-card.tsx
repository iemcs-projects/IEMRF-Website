"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Solution } from "@/lib/solutions-data"

type Props = {
  solution: Solution
}

export function SolutionCard({ solution }: Props) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
        {solution.image ? (
          <Image
            src={solution.image}
            alt={solution.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200 text-5xl">
            {solution.icon || "🔧"}
          </div>
        )}
      </div>

      {/* Content Container */}
      <CardHeader className="flex-1 pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-lg line-clamp-2">{solution.name}</CardTitle>
          {solution.icon && <span className="text-2xl flex-shrink-0">{solution.icon}</span>}
        </div>
        <Badge variant="outline" className="w-fit mb-2">
          {solution.category}
        </Badge>
        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {solution.overview}
        </CardDescription>
      </CardHeader>

      {/* Tags */}
      <CardContent className="pb-3">
        <div className="mb-4 flex flex-wrap gap-1">
          {solution.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* CTA Button */}
      <div className="px-6 pb-6">
        <Link href={`/solutions/${solution.id}`}>
          <Button
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Know More
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
