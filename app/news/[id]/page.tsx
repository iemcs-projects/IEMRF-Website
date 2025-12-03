"use client"

import useSWR from "swr"
import { useRouter } from "next/navigation"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { data, error } = useSWR<{ news: any[] }>("/api/news", fetcher)
  const router = useRouter()

  if (error) return <div className="p-6 text-sm text-red-600">Failed to load news.</div>
  if (!data) return <div className="p-6">Loading…</div>

  const item = data.news.find((n: any) => n.id === id)
  if (!item) return <div className="p-6 text-sm text-gray-600">News item not found.</div>

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <div className="text-sm text-gray-500">{new Date(item.date).toDateString()}</div>
        </div>
        <div>
          <button onClick={() => router.back()} className="text-sm text-blue-600 hover:underline">Back</button>
        </div>
      </div>

      <article className="space-y-6">
        <div className="rounded-lg overflow-hidden shadow-sm">
          {item.id === "ignitehub" ? (
            <img
              src="/IgniteHub.jpg"
              onError={(e) => {
                try {
                  ;(e.target as HTMLImageElement).src = "/IgniteHub Poster - IEM_page-0001.jpg"
                } catch (err) {}
              }}
              alt={item.title}
              className="w-full object-cover max-h-64"
            />
          ) : (
            <img src="/images/hero-technology.jpg" alt={item.title} className="w-full object-cover max-h-64" />
          )}
        </div>

        <div className="prose max-w-none">
          <p>{item.summary}</p>
          {item.content && (
            <div className="mt-4">
              <p>{item.content}</p>
            </div>
          )}
          {item.poster && (
            <section className="mt-6 rounded-lg border bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Poster</h3>
              <div className="mt-3 rounded overflow-hidden">
                <a href={item.poster} target="_blank" rel="noreferrer">
                  <img src={item.poster} alt="Poster" className="w-full object-contain max-h-96" />
                </a>
                <div className="mt-2">
                  <a href={item.poster} download className="text-sm text-blue-600 hover:underline">Download poster</a>
                </div>
              </div>
            </section>
          )}
          {item.status === "closed" && (
            <div className="mt-4 rounded-md bg-gray-100 p-4 text-sm text-gray-800">
              <strong>Update:</strong> This program is now closed. Selected candidates have been contacted.
            </div>
          )}

          {/* Put poster details here for historical reference */}
          {item.id === "winter-internship" && (
            <section className="mt-6 rounded-lg border bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Winter Internship 2025 — Summary</h3>
              <p className="mt-2 text-sm text-gray-700">Thank you to all applicants. The Winter Internship 2025 cycle is closed. Below are outcomes and highlights from the program.</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded overflow-hidden">
                  <img src="/images/hero-innovation.jpg" alt="Winter internship" className="w-full object-cover h-48" />
                </div>
                <div>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    <li>Selected candidates notified via email.</li>
                    <li>Workshops and mentor sessions scheduled.</li>
                    <li>Outcomes: prototypes, papers, and startup ideas.</li>
                  </ul>
                  <div className="mt-4">
                    <Link href="/" className="text-sm text-blue-600 hover:underline">Return to homepage</Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  )
}
