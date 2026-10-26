"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, runTransaction, type Firestore } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

const SESSION_KEY = "portfolio:visit-counted";
const STATS_DOC = ["stats", "visits"] as const;

/**
 * One request per page load, shared by the effect's StrictMode re-runs, so a
 * development double-mount cannot count the same visitor twice.
 */
let visitRequest: Promise<number | null> | null = null;

async function readOrIncrementVisits(db: Firestore): Promise<number | null> {
  const ref = doc(db, ...STATS_DOC);
  let counted = false;
  try {
    counted = window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    // Storage blocked (private mode): count the visit but display the total from this load only.
  }

  if (!counted) {
    const total = await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(ref);
      if (!snapshot.exists()) {
        transaction.set(ref, { count: 1 });
        return 1;
      }
      const current = snapshot.data().count;
      const next = typeof current === "number" ? current + 1 : 1;
      transaction.update(ref, { count: next });
      return next;
    });
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Non-fatal: the worst case is another increment on the next load.
    }
    return total;
  }

  const snapshot = await getDoc(ref);
  const current = snapshot.exists() ? snapshot.data().count : null;
  return typeof current === "number" ? current : null;
}

export function VisitCounter() {
  const [db] = useState(() => getFirebaseDb());
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!db) return;
    let active = true;
    visitRequest ??= readOrIncrementVisits(db).catch(() => null);
    visitRequest.then((value) => {
      if (active) setCount(value);
    });
    return () => {
      active = false;
    };
  }, [db]);

  if (!db || count === null) return null;

  return <span>{count === 1 ? "1 visitor" : `${count.toLocaleString("en-US")} visitors`}</span>;
}
