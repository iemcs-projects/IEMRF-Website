export function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="mt-12 rounded border bg-white p-6 text-gray-900">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-pretty text-lg font-semibold">Have a visionary idea?</h3>
            <p className="mt-1 text-sm text-gray-600">
              Join our ecosystem to turn research into high-impact entrepreneurial ventures.
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center rounded bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
          >
            Apply or Partner
          </a>
        </div>
      </div>
    </section>
  )
}
