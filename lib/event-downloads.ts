// Mapping of event IDs to their downloadable PPT files
// Returns null if no PPT is registered for the event
// Mapping of event IDs to downloadable PPT files (served from `public/`)
const pptMapping: Record<string, string> = {
  // Map Agile Project Management workshop (exact filename as requested)
  "e-pa-1": "/downloads/events/Agile Project Management (IEMRF).pptx",
  // Add more event PPTs here as needed
}

export function getPptForEvent(eventId: string, eventTitle: string): string | null {
  return pptMapping[eventId] || null
}
