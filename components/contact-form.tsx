"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          website: data.get("website"),
        }),
      });

      if (!response.ok) throw new Error("Unable to send enquiry");

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return <form className="quick-form" onSubmit={handleSubmit}>
    <label>Name:<input name="name" autoComplete="name" required maxLength={100} /></label>
    <label>Email:<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
    <label>Phone:<input name="phone" type="tel" autoComplete="tel" maxLength={50} /></label>
    <label className="contact-honeypot" aria-hidden="true">Website:<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send"}</button>
    <p className={`form-status${status === "error" ? " form-status-error" : ""}`} aria-live="polite">
      {status === "sent" && "Thank you. Your enquiry has been sent."}
      {status === "error" && "Sorry, your enquiry could not be sent. Please email or call us instead."}
    </p>
  </form>;
}
