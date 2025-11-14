// Mapping of research project IDs to their downloadable PPT files
// Returns null if no PPT is registered for the project
const pptMapping: Record<string, string> = {
  "rp-001": "/downloads/research/SDLC-Automator.pptx",      // SDLC Automator
  "rp-002": "/downloads/research/NAAC-DVV.pptx",            // NAAC-DVV
  // Add more projects here as needed (place files in `public/downloads/research`)
}

export function getPptForProject(projectId: string, projectTitle: string): string | null {
  return pptMapping[projectId] || null
}
