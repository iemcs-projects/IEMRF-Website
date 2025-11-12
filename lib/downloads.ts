export const PROJECT_DETAILS_BASE_PATH = "/uploads/projects/details"

export type ProjectKind = "program" | "research" | "startup" | "internship" | "event" | "product"

/**
 * Returns a canonical download URL for a project's details file.
 * Convention: `${PROJECT_DETAILS_BASE_PATH}/${kind}/${id}.pdf`
 */
export function getProjectDownloadUrl(kind: ProjectKind, id: string, preferredExt: "pdf" | "docx" | "json" = "pdf") {
  const safeKind = kind.toLowerCase()
  return `${PROJECT_DETAILS_BASE_PATH}/${safeKind}/${id}.${preferredExt}`
}



