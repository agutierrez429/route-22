import { notFound } from "next/navigation";
import Link from "next/link";

import { stops } from "@/lib/data";

export default async function StopPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const {id} = await params;

    const stop = stops.find((s) => s.id ===id);

    if (!stop) {
        notFound();
    }

    const nextStop = stops.find(
        (s) => s.orderIndex === stop.orderIndex + 1
    );

    return (
        <main className="min-h-screen bg-neutral-950 text-white px-6 py-12">
            <div className="mx-auto max-w-2xl">
                <p className="mb-2 text-neutral-500">
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
                    className="mb-6 w-full rounded-xl"
                />

                <p className="mb-10">{stop.caption}</p>

                {nextStop ? (
                    <Link 
                    href={`/stops/${nextStop.id}`}
                    className="rounded-full bg-white px-6 py-3 text-black"
                    >
                        Next Stop
                    </Link>
                ) : (
                    <Link
                        href="/final-stop"
                        className="rounded-full bg-white px-6 py-3 text-black"
                    >
                        Final Stop
                    </Link>
                )}


            </div>
        </main>
    );
}