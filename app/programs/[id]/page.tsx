import { notFound } from "next/navigation"
import { programDetails } from "@/lib/programs-data"
import ProgramDetailContent from "@/components/program-detail-content"

interface ProgramDetailPageProps {
  params: {
    id: string
  }
}

export default function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const program = programDetails.find((p) => p.id === params.id)

  if (!program) {
    notFound()
  }

  return <ProgramDetailContent program={program} />
}

export async function generateStaticParams() {
  return programDetails.map((program) => ({
    id: program.id,
  }))
}
