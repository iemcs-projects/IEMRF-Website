import { promises as fs } from "fs"
import path from "path"

export type MentorInfo = {
  id?: string
  name: string
  image?: string
}

export type ProjectMentorAssignment = {
  mentor?: MentorInfo
  lead?: MentorInfo
  guide?: MentorInfo
}

export type MentorState = Record<string, ProjectMentorAssignment>

const DATA_DIR = path.join(process.cwd(), "data")
const FILE_PATH = path.join(DATA_DIR, "mentor-assignments.json")

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.access(FILE_PATH)
  } catch {
    await fs.writeFile(FILE_PATH, JSON.stringify({}, null, 2), "utf8")
  }
}

export async function readMentorAssignments(): Promise<MentorState> {
  await ensureFile()
  const raw = await fs.readFile(FILE_PATH, "utf8")
  try {
    return JSON.parse(raw) as MentorState
  } catch {
    return {}
  }
}

export async function writeMentorAssignments(state: MentorState): Promise<void> {
  await ensureFile()
  await fs.writeFile(FILE_PATH, JSON.stringify(state, null, 2), "utf8")
}

export async function setMentorFor(
  projectKey: string,
  kind: keyof ProjectMentorAssignment,
  info: MentorInfo | undefined,
): Promise<MentorState> {
  const state = await readMentorAssignments()
  const existing = state[projectKey] || {}
  state[projectKey] = { ...existing, [kind]: info }
  await writeMentorAssignments(state)
  return state
}



