import Link from "next/link";

export default function RevealPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-200 via-yellow-100 to-pink-200 px-6 py-10 text-slate-900">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-sky-600">
          Route 22 Continues
        </p>

        <h1 className="mb-6 text-5xl font-black sm:text-6xl">
          We’re going on a roadtrip.
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-slate-600">
          This birthday surprise does not end here. The next part is something
          we get to experience together.
        </p>

        <div className="mb-10 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
            The Route
          </p>

          <div className="flex flex-col gap-4 text-3xl font-black sm:flex-row sm:items-center sm:justify-between">
            <span>Montclair, CA</span>
            <span className="text-pink-500">→</span>
            <span>Seattle, WA</span>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-sky-500" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
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
              className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur-md transition hover:-translate-y-1"
            >
              <p className="mb-2 text-sm font-bold text-pink-500">
                {card.label}
              </p>
              <h2 className="text-xl font-black">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/scrapbook"
            className="rounded-full bg-sky-500 px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-sky-600"
          >
            Open Scrapbook
          </Link>
        </div>
      </section>
    </main>
  );
}