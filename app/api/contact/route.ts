import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body || {}
    if (
      !name ||
      typeof name !== "string" ||
      !email ||
      typeof email !== "string" ||
      !message ||
      typeof message !== "string"
    ) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 })
    }

    // You could integrate email or CRM here. For now we simply acknowledge.
    console.log("[v0] Contact submission:", { name, email, message })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 })
  }
}
