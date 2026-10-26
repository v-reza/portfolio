"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import s from "./GuestBook.module.css";

const NAME_MAX = 40;
const MESSAGE_MAX = 280;
const MAX_ENTRIES = 30;
const RATE_LIMIT_MS = 30_000;
const RATE_KEY = "portfolio:guestbook-sent-at";

type Entry = {
  id: string;
  name: string;
  message: string;
  createdAt: Timestamp | null;
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatDate(value: Timestamp | null): string {
  if (!value) return "just now";
  try {
    return dateFormat.format(value.toDate());
  } catch {
    return "recent";
  }
}

export function GuestBook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(() => !!getFirebaseDb());
  const [dbAvailable, setDbAvailable] = useState(() => !!getFirebaseDb());

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    const db = getFirebaseDb();
    if (!db) {
      return;
    }

    const q = query(
      collection(db, "guestbook"),
      orderBy("createdAt", "desc"),
      limit(MAX_ENTRIES)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const next: Entry[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: typeof data.name === "string" ? data.name : "Anonymous",
            message: typeof data.message === "string" ? data.message : "",
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt : null,
          };
        });
        setEntries(next);
        setLoading(false);
      },
      () => {
        setDbAvailable(false);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.kind === "sending") return;

    if (honeypot.trim().length > 0) {
      setStatus({ kind: "sent" });
      setName("");
      setMessage("");
      return;
    }

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setStatus({ kind: "error", message: "Please provide both a name and a message." });
      return;
    }

    if (trimmedName.length > NAME_MAX || trimmedMessage.length > MESSAGE_MAX) {
      setStatus({ kind: "error", message: "Entry exceeds character limits." });
      return;
    }

    if (typeof window !== "undefined") {
      const last = window.localStorage.getItem(RATE_KEY);
      if (last) {
        const delta = Date.now() - Number(last);
        if (delta < RATE_LIMIT_MS) {
          const waitSec = Math.ceil((RATE_LIMIT_MS - delta) / 1000);
          setStatus({
            kind: "error",
            message: `Please wait ${waitSec}s before leaving another entry.`,
          });
          return;
        }
      }
    }

    const db = getFirebaseDb();
    if (!db) {
      setStatus({ kind: "error", message: "Guestbook is temporarily unavailable." });
      return;
    }

    setStatus({ kind: "sending" });

    try {
      await addDoc(collection(db, "guestbook"), {
        name: trimmedName,
        message: trimmedMessage,
        createdAt: serverTimestamp(),
      });

      if (typeof window !== "undefined") {
        window.localStorage.setItem(RATE_KEY, String(Date.now()));
      }

      setStatus({ kind: "sent" });
      setName("");
      setMessage("");
    } catch {
      setStatus({
        kind: "error",
        message: "Failed to publish entry. Please try again shortly.",
      });
    }
  };

  return (
    <section id="guestbook" className={s.section} aria-labelledby="guestbook-title">
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.num}>BUKU TAMU</div>
          <h2 id="guestbook-title" className={s.title}>
            Leave a line in the register.
          </h2>
          <p className={s.sub}>
            Every visitor is welcome to sign. Entries sync in real time across sessions.
          </p>
        </div>

        <div className={s.guestbookCard}>
          <div className={s.cardTop}>
            <span className={s.cardHeading}>Register of Visitors</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted)" }}>
              {loading ? "syncing..." : `${entries.length} recent entries`}
            </span>
          </div>

          <div className={s.entryList}>
            {loading ? (
              <div style={{ color: "var(--muted)", fontSize: "13px" }}>Loading entries...</div>
            ) : entries.length === 0 ? (
              <div style={{ color: "var(--muted)", fontSize: "13px" }}>
                No entries yet. Be the first to sign!
              </div>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className={s.entryItem}>
                  <div className={s.entryHeader}>
                    <span className={s.entryAuthor}>{entry.name}</span>
                    <span className={s.entryDate}>{formatDate(entry.createdAt)}</span>
                  </div>
                  <p className={s.entryMessage}>{entry.message}</p>
                </div>
              ))
            )}
          </div>

          {dbAvailable && (
            <form onSubmit={handleSubmit} className={s.form}>
              <div style={{ display: "none" }} aria-hidden="true">
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className={s.inputRow}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={NAME_MAX}
                  required
                  className={s.inputField}
                />
                <textarea
                  placeholder="Leave a message or greeting..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={MESSAGE_MAX}
                  required
                  rows={2}
                  className={s.textField}
                />
              </div>

              <div className={s.formBottom}>
                <div className={s.charCount}>
                  {message.length} / {MESSAGE_MAX} characters
                </div>
                <button
                  type="submit"
                  disabled={status.kind === "sending"}
                  className={s.submitBtn}
                >
                  {status.kind === "sending" ? "Publishing..." : "Sign Register ↗"}
                </button>
              </div>

              {status.kind === "error" && (
                <div style={{ color: "#ef4444", fontSize: "13px", marginTop: "8px" }}>
                  {status.message}
                </div>
              )}
              {status.kind === "sent" && (
                <div style={{ color: "#10b981", fontSize: "13px", marginTop: "8px" }}>
                  ✓ Thank you — your line is now in the register.
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
