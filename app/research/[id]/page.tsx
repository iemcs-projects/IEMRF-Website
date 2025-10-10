import { notFound } from "next/navigation"
import { ResearchProjectDetail } from "@/components/research-project-detail"
import { researchProjects } from "@/lib/research-data"

type Props = {
  params: { id: string }
}

export async function generateStaticParams() {
  return researchProjects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: Props) {
  const project = researchProjects.find((p) => p.id === params.id)

  if (!project) {
    return {
      title: "Project Not Found - IEMRF",
    }
  }

  return {
    title: `${project.title} - Research - IEMRF`,
    description: project.overview,
  }
}

export default function ResearchProjectPage({ params }: Props) {
  const project = researchProjects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <ResearchProjectDetail project={project} />
    </main>
  )
}
