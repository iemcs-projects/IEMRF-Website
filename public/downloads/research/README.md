# Research Project Downloads

Place your PPT files in this directory for download on the research project detail pages.

## File Naming Convention

When adding new PPT files, follow this naming:
- **SDLC Automator**: `SDLC-Automator.pptx`
- **NAAC-DVV**: `NAAC-DVV.pptx`

## How to Add More Projects

Edit `lib/research-downloads.ts` and add entries to the `pptMapping` object:

```typescript
const pptMapping: Record<string, string> = {
  "rp-001": "/downloads/research/SDLC-Automator.pptx",
  "rp-002": "/downloads/research/NAAC-DVV.pptx",
  "rp-003": "/downloads/research/YourProjectName.pptx", // Add here
}
```

Then place the corresponding PPT file in this directory.

## How Download Details Works

1. **For SDLC Automator (rp-001) & NAAC-DVV (rp-002)**:
   - Downloads the registered PPT file directly
   
2. **For All Other Research Projects**:
   - Generates a PDF snapshot of the project page
   - Falls back to opening the page in browser if PDF generation fails
   - Final fallback: Exports project data as JSON

## Important Notes

- PPT files must be added to this directory (`public/downloads/research/`)
- The filename must match exactly what's in `lib/research-downloads.ts`
- The path always starts with `/downloads/research/` (public root relative)
