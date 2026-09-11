import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maximumLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

export async function POST(request: Request) {
  const resendKey = process.env.RESEND_KEY;
  if (!resendKey) return NextResponse.json({ error: "Email service is unavailable." }, { status: 500 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const phone = clean(body.phone, 50);
  const website = clean(body.website, 200);

  // Silently accept likely bot submissions without sending an email.
  if (website) return NextResponse.json({ sent: true });

  if (!name || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid name and email address." }, { status: 400 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Mott Research <info@mottresearch.com>",
      to: ["jhn.mott@gmail.com"],
      reply_to: email,
      subject: `Website enquiry from ${name.replace(/[\r\n]+/g, " ")}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "Not provided"}`].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("Resend contact email failed", response.status, await response.text());
    return NextResponse.json({ error: "Unable to send enquiry." }, { status: 502 });
  }

  return NextResponse.json({ sent: true });
}
