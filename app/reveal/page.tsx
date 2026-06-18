import type { CSSProperties } from "react";
import Link from "next/link";

const confettiPieces = [
  ["2%", "#38bdf8", "0s", "5.4s", "18vw", "620deg", "8px", "14px"],
  ["6%", "#f97316", "0.9s", "6.2s", "12vw", "480deg", "7px", "12px"],
  ["10%", "#ec4899", "1.7s", "5.8s", "22vw", "720deg", "10px", "10px"],
  ["15%", "#facc15", "0.3s", "6.5s", "16vw", "540deg", "6px", "16px"],
  ["19%", "#22c55e", "2.1s", "5.7s", "10vw", "680deg", "9px", "13px"],
  ["24%", "#a855f7", "1.1s", "6.1s", "20vw", "520deg", "7px", "15px"],
  ["28%", "#fb7185", "0.5s", "5.5s", "14vw", "760deg", "9px", "9px"],
  ["33%", "#0ea5e9", "1.9s", "6.4s", "18vw", "600deg", "6px", "14px"],
  ["38%", "#f59e0b", "0.2s", "5.9s", "11vw", "500deg", "8px", "12px"],
  ["42%", "#14b8a6", "2.4s", "6.6s", "19vw", "720deg", "10px", "11px"],
  ["47%", "#e879f9", "1.3s", "5.6s", "15vw", "560deg", "7px", "16px"],
  ["52%", "#fb923c", "0.7s", "6.3s", "21vw", "660deg", "9px", "12px"],
  ["57%", "#60a5fa", "1.6s", "5.8s", "13vw", "520deg", "8px", "14px"],
  ["61%", "#f43f5e", "0.1s", "6s", "17vw", "700deg", "7px", "13px"],
  ["66%", "#84cc16", "2s", "6.7s", "12vw", "500deg", "9px", "9px"],
  ["70%", "#c084fc", "1s", "5.6s", "20vw", "640deg", "6px", "16px"],
  ["75%", "#22d3ee", "0.4s", "6.2s", "14vw", "580deg", "8px", "13px"],
  ["79%", "#fbbf24", "2.2s", "5.9s", "18vw", "760deg", "10px", "10px"],
  ["84%", "#f472b6", "1.5s", "6.5s", "11vw", "540deg", "7px", "14px"],
  ["89%", "#4ade80", "0.8s", "5.7s", "16vw", "680deg", "9px", "12px"],
  ["94%", "#38bdf8", "1.8s", "6.1s", "13vw", "620deg", "8px", "15px"],
  ["98%", "#fb7185", "0.6s", "5.5s", "9vw", "480deg", "7px", "12px"],
];

function ConfettiBurst() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {confettiPieces.map(
        ([left, color, delay, duration, drift, spin, width, height], index) => (
          <span
            key={`${left}-${delay}`}
            className="confetti-piece"
            data-shape={index % 3 === 0 ? "circle" : "rectangle"}
            style={
              {
                "--confetti-left": left,
                "--confetti-drift": drift,
                "--confetti-spin": spin,
                "--confetti-duration": duration,
                "--confetti-delay": delay,
                "--confetti-width": width,
                "--confetti-height": height,
                backgroundColor: color,
              } as CSSProperties
            }
          />
        )
      )}
    </div>
  );
}

export default function RevealPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-200 via-yellow-100 to-pink-200 px-4 py-4 text-slate-900 sm:px-6 sm:py-6">
      <ConfettiBurst />

      <section className="relative z-10 mx-auto max-w-4xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-sky-600 sm:text-sm sm:tracking-[0.35em]">
          Route 22 Continues
        </p>

        <h1 className="mb-4 text-3xl font-black leading-none sm:text-5xl">
          We&apos;re going on a roadtrip.
        </h1>

        <p className="mb-8 max-w-2xl text-base text-slate-600">
          This birthday surprise does not end here. The next part is something
          we get to experience together.
        </p>

        <div className="mb-8 rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-2xl backdrop-blur-md sm:p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
            The Route
          </p>

          <div className="flex flex-col gap-2 text-xl font-black leading-tight sm:flex-row sm:items-center sm:justify-between sm:text-2xl">
            <span>Montclair, CA</span>
            <span className="text-pink-500">&rarr;</span>
            <span>Seattle, WA</span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-sky-500" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Plan",
              title: "Head north",
              text: "A birthday trip built around views, food, music, and time together.",
            },
            {
              label: "Mission",
              title: "Make memories",
              text: "Take pictures, collect little moments, and save them here.",
            },
            {
              label: "Archive",
              title: "Build the scrapbook",
              text: "Route 22 becomes the place where this trip lives.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur-md transition hover:-translate-y-1"
            >
              <p className="mb-2 text-xs font-bold text-pink-500">
                {card.label}
              </p>
              <h2 className="text-lg font-black">{card.title}</h2>
              <p className="mt-2 text-xs text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-stretch sm:justify-end">
          <Link
            href="/scrapbook"
            className="inline-flex w-full justify-center rounded-full bg-sky-500 px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-sky-600 sm:w-auto"
          >
            Open Scrapbook
          </Link>
        </div>
      </section>
    </main>
  );
}
