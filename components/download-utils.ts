// Lightweight download helpers used by several components.
// Restores the missing module so the build succeeds.
export async function downloadPagePdf(path: string, fileName = "details.pdf") {
  if (typeof window === "undefined") return

  const url = path.startsWith("/") ? `${window.location.origin}${path}` : path

  try {
    // Dynamic import to avoid bundling heavy libs on server-side
    const html2canvasModule: any = (await import('html2canvas'))
    const html2canvas = html2canvasModule?.default || html2canvasModule
    const jspdfModule: any = await import('jspdf')
    const { jsPDF } = jspdfModule as any

    // Create an off-screen iframe to render the target page and snapshot it
    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.left = '-9999px'
    iframe.style.top = '0'
    iframe.style.width = '1200px'
    iframe.style.height = '800px'
    iframe.src = url
    document.body.appendChild(iframe)

    await new Promise<void>((resolve, reject) => {
      const onLoad = async () => {
        try {
          const doc = iframe.contentWindow?.document
          if (!doc) throw new Error('Could not access iframe document')
          const body = doc.body as unknown as HTMLElement

          const canvas = await html2canvas(body, { scale: 1 })
          const imgData = canvas.toDataURL('image/png')

          const pdf = new jsPDF('p', 'mm', 'a4')
          const imgProps = (pdf as any).getImageProperties ? (pdf as any).getImageProperties(imgData) : { width: canvas.width, height: canvas.height }
          const pdfWidth = (pdf as any).internal.pageSize.getWidth()
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
          pdf.save(fileName)
          resolve()
        } catch (err) {
          reject(err)
        } finally {
          try { iframe.remove() } catch {}
        }
      }

      iframe.addEventListener('load', onLoad, { once: true })

      // Timeout fallback
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          try { iframe.remove() } catch {}
          reject(new Error('Iframe load timeout'))
        }
      }, 15000)
    })
  } catch (error) {
    console.error('downloadPagePdf error:', error)
    // Fallback: navigate the current tab to the page so the user can print/save manually
    if (typeof window !== 'undefined') {
      try {
        // Use same-tab navigation to avoid opening a new tab/window
        window.location.href = url
      } catch (e) {
        // As a last resort, attempt to open in a new tab if same-tab navigation is blocked
        try { window.open(url, '_blank') } catch {}
      }
    }
    throw error
  }
}

export async function downloadProgramPdf(programId: string, programTitle: string) {
  return downloadPagePdf(`/programs/${programId}`, `${programTitle.replace(/\s+/g, '-').toLowerCase()}-details.pdf`)
}
