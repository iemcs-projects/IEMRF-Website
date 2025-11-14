import { NextResponse } from "next/server"

// Server-side email sending using nodemailer when SMTP is configured.
// Environment variables supported:
// - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
// - FROM_EMAIL (site email to use as fallback sender)

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

    console.log("[contact] submission:", { name, email, message })

    // If SMTP is not configured, return a flag so the client can fallback to mailto:
    const smtpHost = process.env.SMTP_HOST
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpPort = process.env.SMTP_PORT
    const fromEmail = process.env.FROM_EMAIL || "no-reply@iemrf.org"

    if (!smtpHost || !smtpUser || !smtpPass) {
      // No SMTP configured — let client fallback to mailto
      return NextResponse.json({ ok: false, mailto: true })
    }

    // Try sending via nodemailer
    try {
      const nodemailer = await import("nodemailer")

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort ? Number(smtpPort) : 587,
        secure: smtpPort ? Number(smtpPort) === 465 : false,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      // Compose mail. Attempt to set From to user's typed email. Some providers may
      // reject unverified From addresses — in that case we fallback to FROM_EMAIL and
      // set Reply-To to the user's email so responses go to them.

      const mailOptions = {
        from: email, // attempt to use user's typed email as From
        to: "iem.industryconsulting@gmail.com",
        subject: `Website contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message}</p>`,
      }

      // If transporter.verify is available, we can try to send and catch errors
      try {
        await transporter.sendMail(mailOptions)
      } catch (sendErr) {
        // If sending with user's email as From fails (common), retry with FROM_EMAIL and Reply-To
        console.warn("[contact] send failed with user From, retrying with fallback sender:", sendErr)
        const fallback = {
          ...mailOptions,
          from: fromEmail,
          replyTo: email,
        }
        await transporter.sendMail(fallback)
      }

      return NextResponse.json({ ok: true })
    } catch (err) {
      console.error("[contact] nodemailer error:", err)
      // If nodemailer or send fails, signal mailto fallback to client
      return NextResponse.json({ ok: false, mailto: true })
    }
  } catch (e) {
    console.error("[contact] error:", e)
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 })
  }
}
