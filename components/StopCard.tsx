import type { Stop } from "@/types";

type StopCardProps = {
    stop: Stop;
};

export default function StopCard({ stop }: StopCardProps) {
    return ( 
        <article className ="rounded-2xl border border-neutral-800 bg-beutral-900 p-6">
            <p className ="mb-2 text-sm uppercase tracking-[0.25em] text-neutral-500">
                Stop {stop.orderIndex}
            </p>

            <h2 className = "mb-2 text-2xl font-semibold">{stop.title}</h2>

            <p className = "mb-4 text-neutral-400">From: {stop.senderName}</p>

            <video
                src={stop.videoUrl}
                controls
                preload="metadata"
                className = "mb-4 aspect-video w-full rounded-xl bg-neutral-800"
            />

            <p className = "text-neutral-300">{stop.caption}</p>
        </article>
    );
}