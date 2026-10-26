"use client";

import { useState } from "react";
import { contact } from "@/content/chapters";
import s from "./ContactSection.module.css";

export function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (email: string) => {
    await navigator.clipboard.writeText(email);
    setCopied(email);
    window.setTimeout(() => setCopied(null), 2000);
  };

  return (
    <footer id="contact" className={s.section} aria-labelledby="contact-title">
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.num}>SAY HEY</div>
          <h2 id="contact-title" className={s.title}>
            Let’s build something deterministic.
          </h2>
          <p className={s.sub}>
            For engineering roles, multi-agent AI orchestration, or system architecture.
            Email reaches me fastest.
          </p>
        </div>

        <div className={s.emailGrid}>
          {contact.emails.map((email) => (
            <div key={email} className={s.emailCard}>
              <a href={`mailto:${email}`} className={s.emailLink}>
                {email}
              </a>
              <button
                type="button"
                className={s.copyBtn}
                onClick={() => copy(email)}
                aria-label={`Copy email ${email}`}
              >
                {copied === email ? "COPIED ✓" : "COPY"}
              </button>
            </div>
          ))}
        </div>

        <div className={s.linksList}>
          {contact.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={s.socialBtn}
            >
              <span>{link.label}</span>
              <span aria-hidden="true" style={{ color: "var(--accent)" }}>↗</span>
            </a>
          ))}
        </div>

        <div className={s.footer}>
          <div>M Zulfi Fahreza · Fullstack & AI Systems Engineer</div>
          <div>Malang, East Java, Indonesia · 2026</div>
        </div>
      </div>
    </footer>
  );
}
