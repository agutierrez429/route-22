import Link from "next/link";
import { notFound } from "next/navigation";
import { stops } from "@/lib/data";

export default async function StopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stop = stops.find((s) => s.id === id);

  if (!stop) {
    notFound();
  }

  const currentIndex = stops.findIndex((s) => s.id === stop.id);
  const previousStop = stops[currentIndex - 1];
  const nextStop = stops[currentIndex + 1];

  const progressPercent = Math.round(
    ((currentIndex + 1) / stops.length) * 100
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-pink-100 px-6 py-10 text-slate-900">
      <section className="mx-auto max-w-2xl">
        <div className="mb-8 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-xl backdrop-blur-md">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-sky-500">
            Route 22
          </p>

          <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-600">
            <span>
              Stop {currentIndex + 1} of {stops.length}
            </span>
            <span>{progressPercent}% complete</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-sky-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-pink-500">
            Stop {stop.orderIndex}
          </p>

          <h1 className="mb-4 text-4xl font-black">{stop.title}</h1>

          <p className="mb-6 font-semibold text-slate-500">
            From: {stop.senderName}
          </p>

          <video
            src={stop.videoUrl}
            controls
            preload="metadata"
            className="mb-6 aspect-video w-full rounded-2xl bg-slate-200 shadow-lg"
          />

          <p className="text-lg text-slate-700">{stop.caption}</p>
        </article>

        <div className="mt-8 flex items-center justify-between gap-4">
          {previousStop ? (
            <Link
              href={`/stops/${previousStop.id}`}
              className="rounded-full border-2 border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 shadow transition hover:-translate-y-1"
            >
              Previous
            </Link>
          ) : (
            <Link
              href="/intro"
              className="rounded-full border-2 border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 shadow transition hover:-translate-y-1"
            >
              Back
            </Link>
          )}

          {nextStop ? (
            <Link
              href={`/stops/${nextStop.id}`}
              className="rounded-full bg-pink-500 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-pink-600"
            >
              Next Stop
            </Link>
          ) : (
            <Link
              href="/final-stop"
              className="rounded-full bg-pink-500 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-pink-600"
            >
              Final Stop
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}