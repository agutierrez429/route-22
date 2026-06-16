"use client";

import { useEffect, useState } from "react";

type SitePasswordGateProps = {
  children: React.ReactNode;
};

export default function SitePasswordGate({ children }: SitePasswordGateProps) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("route22_unlocked");

    if (saved === "true") {
      setIsUnlocked(true);
    }
  }, []);

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
      <section className="w-full max-w-sm rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
          Route 22
        </p>

        <h1 className="mb-4 text-3xl font-bold">Enter the Route</h1>

        <p className="mb-6 text-neutral-400">
          This birthday route is private.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (password === process.env.NEXT_PUBLIC_SITE_PASSWORD) {
              window.localStorage.setItem("route22_unlocked", "true");
              setIsUnlocked(true);
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