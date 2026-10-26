import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { connectFirestoreEmulator, getFirestore, type Firestore } from "firebase/firestore";

type Emulator = { host: string; port: number };

function parseEmulator(raw: string | undefined): Emulator | null {
  const value = raw?.trim();
  if (!value) return null;
  const [host, port] = value.split(":");
  if (!host) return null;
  const parsedPort = Number(port ?? "8080");
  return { host, port: Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 8080 };
}

function readOptions(emulator: Emulator | null): FirebaseOptions | null {
  // NEXT_PUBLIC_* values are inlined at build time, so they must be read with dot notation.
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return null;

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
  // The emulator accepts a bare project id; production Firestore needs the real Web App credentials.
  if (!emulator && (!apiKey || !appId)) return null;

  return {
    apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId,
  };
}

// Kept on globalThis so Fast Refresh does not initialise the app or dial the emulator twice.
type FirestoreHolder = { __portfolioFirestore?: Firestore | null };
const holder = globalThis as FirestoreHolder;

/**
 * Returns the Firestore client, or null when the Firebase web config is absent.
 * With NEXT_PUBLIC_FIREBASE_EMULATOR_HOST set, it connects to that local emulator.
 */
export function getFirebaseDb(): Firestore | null {
  if (holder.__portfolioFirestore !== undefined) return holder.__portfolioFirestore;

  const emulator = parseEmulator(process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST);
  const options = readOptions(emulator);
  if (!options) {
    holder.__portfolioFirestore = null;
    return null;
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(options);
  const db = getFirestore(app);
  if (emulator) connectFirestoreEmulator(db, emulator.host, emulator.port);

  holder.__portfolioFirestore = db;
  return db;
}
