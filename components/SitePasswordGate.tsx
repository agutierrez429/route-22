"use client";

import { useState, useSyncExternalStore } from "react";

type SitePasswordGateProps = {
  children: React.ReactNode;
};

const STORAGE_KEY = "route22_unlocked";
const UNLOCK_EVENT = "route22-unlock";

function subscribeToUnlockStatus(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(UNLOCK_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(UNLOCK_EVENT, onStoreChange);
  };
}

function getUnlockSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

function getServerUnlockSnapshot() {
  return false;
}

export default function SitePasswordGate({ children }: SitePasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isUnlocked = useSyncExternalStore(
    subscribeToUnlockStatus,
    getUnlockSnapshot,
    getServerUnlockSnapshot
  );

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-8 text-white sm:px-6">
      <section className="w-full max-w-sm rounded-3xl border border-neutral-800 bg-neutral-900 p-5 sm:p-6">
        <p className="mb-3 text-xs uppercase tracking-[0.24em] text-neutral-500 sm:text-sm sm:tracking-[0.3em]">
          Route 22
        </p>

        <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
          Enter the Route
        </h1>

        <p className="mb-6 text-neutral-400">
          This birthday route is private.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (password === process.env.NEXT_PUBLIC_SITE_PASSWORD) {
              window.localStorage.setItem(STORAGE_KEY, "true");
              window.dispatchEvent(new Event(UNLOCK_EVENT));
              setError("");
            } else {
              setError("Wrong password. Try again.");
            }
          }}
          className="space-y-4"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-white px-6 py-3 font-medium text-black"
          >
            Unlock
          </button>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>
      </section>
    </main>
  );
}
