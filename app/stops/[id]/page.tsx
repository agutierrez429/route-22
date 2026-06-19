import Link from "next/link";
import { notFound } from "next/navigation";
import AdaptiveVideo from "@/components/AdaptiveVideo";
import RouteProgress from "@/components/RouteProgress";
import StopPhotoGallery from "@/components/StopPhotoGallery";
import { supabase } from "@/lib/supabase";
import type { Stop } from "@/types";

export const dynamic = "force-dynamic";

export default async function StopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: stops, error } = await supabase
    .from("stops")
    .select("*")
    .order("order_index", { ascending: true });

  if (error || !stops) {
    notFound();
  }

  const typedStops = stops as Stop[];
  const stop = typedStops.find((s) => s.id === id);

  if (!stop) {
    notFound();
  }

  const currentIndex = typedStops.findIndex((s) => s.id === stop.id);
  const previousStop = typedStops[currentIndex - 1];
  const nextStop = typedStops[currentIndex + 1];

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-pink-100 px-6 py-10 text-slate-900">
      <section className="mx-auto max-w-2xl">
        <div className="mb-8">
          <RouteProgress
            currentIndex={currentIndex}
            totalStops={typedStops.length}
          />
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-pink-500">
            Stop {stop.order_index}
          </p>

          <h1 className="mb-4 text-4xl font-black">{stop.title}</h1>

          <p className="mb-6 font-semibold text-slate-500">
            From: {stop.sender_name}
          </p>

          <AdaptiveVideo
            src={stop.video_url}
            frameClassName="mb-6 bg-white/70"
          />

          {stop.caption && (
            <p className="text-lg text-slate-700">{stop.caption}</p>
          )}

          <StopPhotoGallery stopId={stop.id} />
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
