import Link from "next/link";
import { notFound } from "next/navigation";
import AdaptiveStopCard from "@/components/AdaptiveStopCard";
import RouteProgress from "@/components/RouteProgress";
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-pink-100 px-4 py-4 text-slate-900 sm:px-6 sm:py-6">
      <section className="mx-auto max-w-5xl">
        <div className="mx-auto mb-3 max-w-3xl">
          <RouteProgress currentIndex={currentIndex} totalStops={stops.length} />
        </div>

        <AdaptiveStopCard stop={stop} />

        <div className="mx-auto mt-4 flex max-w-3xl flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          {previousStop ? (
            <Link
              href={`/stops/${previousStop.id}`}
              className="inline-flex justify-center rounded-full border-2 border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 shadow transition hover:-translate-y-1"
            >
              Previous
            </Link>
          ) : (
            <Link
              href="/intro"
              className="inline-flex justify-center rounded-full border-2 border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 shadow transition hover:-translate-y-1"
            >
              Back
            </Link>
          )}

          {nextStop ? (
            <Link
              href={`/stops/${nextStop.id}`}
              className="inline-flex justify-center rounded-full bg-pink-500 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-pink-600"
            >
              Next Stop
            </Link>
          ) : (
            <Link
              href="/final-stop"
              className="inline-flex justify-center rounded-full bg-pink-500 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-pink-600"
            >
              Final Stop
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
