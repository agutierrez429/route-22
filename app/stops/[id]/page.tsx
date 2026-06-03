import { notFound } from "next/navigation";
import Link from "next/link";

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
        <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
            <section className="mx-auto max-w-2xl">
                <div className="mb-8">
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
                        Route 22
                    </p>

                    <div className="mb-3 flex items-center justify-between text-sm text-neutral-400">
                        <span>
                            Stop {currentIndex + 1} of {stops.length}
                        </span>
                        <span>{progressPercent}% complete</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                        <div
                            className="h-full rounded-full bg-white transition-all"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>


            <article className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
                <p className="mb-2 text-sm uppercase tracking-[0.25em] text-neutral-500">
                    Stop {stop.orderIndex}
                </p>

                <h1 className="mb-4 text-4xl font-bold">
                    {stop.title}
                </h1>

                <p className="mb-6 text-neutral-400">
                    From: {stop.senderName}
                </p>

                <video
                    src={stop.videoUrl}
                    controls
                    preload="metadata"
                    className="mb-6 aspect-video w-full rounded-xl bg-neutral-800"
                />

                <p className="text-neutral-300">{stop.caption}</p>
            </article>

            <div className="mt-8 flex items-center justify-between gap-4">
                {previousStop ? (
                    <Link
                        href={`/stops/${previousStop.id}`}
                        className="rounded-full border border-neutral-700 px-5 py-3 text-neutral-300 transition hover:bg-neutral-900"
                        >
                            Previous
                    </Link>
                ) : (
                    <Link
                        href="/intro"
                        className="rounded-full border border-neutral-700 px-5 py-3 text-neutral-300 transition hover:bg-neutral-900"
                        >
                            Back
                        </Link>
                )}

                {nextStop ? (
                    <Link 
                    href={`/stops/${nextStop.id}`}
                    className="rounded-full bg-white px-5 py-3 font-medium text-black transition hover:opacity-80"
                    >
                        Next Stop
                    </Link>
                ) : (
                    <Link
                        href="/final-stop"
                        className="rounded-full bg-white px-5 py-3 font-medium text-black transition hover:opacity-80"
                    >
                        Final Stop
                    </Link>
                )}


            </div>
            </section>
        </main>
    );
}