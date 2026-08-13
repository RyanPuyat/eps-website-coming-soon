import { NextRequest, NextResponse } from "next/server";

// Basic email shape check — good enough to block junk without being overly strict.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let email: string | undefined;

  try {
    const body = await req.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_WAITLIST_AUDIENCE_ID;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  try {
    // 1. Store the signup as a Resend contact (acts as your waitlist list —
    //    no separate DB needed for this standalone landing page).
    if (audienceId) {
      const contactRes = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, unsubscribed: false }),
        }
      );

      // Resend returns 409-ish behavior for duplicates depending on version;
      // don't fail the request just because they already signed up.
      if (!contactRes.ok && contactRes.status !== 409) {
        const detail = await contactRes.text();
        console.error("Resend contact create failed:", detail);
      }
    }

    // 2. Send a confirmation email so you can verify SPF/DKIM/DMARC are
    //    actually passing on the real domain (check "show original" in Gmail).
    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "EPS Corner <hello@epscorner.com>",
        to: email,
        subject: "You're on the EPS Corner waitlist",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
            <h2 style="color:#0A1F3D;">You're on the list 🎉</h2>
            <p>Thanks for signing up for early access to EPS Corner — exam prep for EPS-TOPIK, KLT, and SCBT.</p>
            <p>We'll email you the moment it opens. No spam in the meantime.</p>
            <p style="color:#8B92AB;font-size:13px;margin-top:32px;">EPS Corner</p>
          </div>
        `,
      }),
    });

    if (!sendRes.ok) {
      const detail = await sendRes.text();
      console.error("Resend send failed:", detail);
      return NextResponse.json(
        { error: "Couldn't send confirmation email. Try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist route error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
