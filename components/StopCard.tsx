import type { Stop } from "@/types";
import AdaptiveVideo from "@/components/AdaptiveVideo";

type StopCardProps = {
    stop: Stop;
};

export default function StopCard({ stop }: StopCardProps) {
    return ( 
        <article className ="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <p className ="mb-2 text-sm uppercase tracking-[0.25em] text-neutral-500">
                Stop {stop.orderIndex}
            </p>

            <h2 className = "mb-2 text-2xl font-semibold">{stop.title}</h2>

            <p className = "mb-4 text-neutral-400">From: {stop.senderName}</p>

            <AdaptiveVideo
                src={stop.videoUrl}
                frameClassName="mb-4 bg-neutral-800"
                className="bg-neutral-900"
            />

            <p className = "text-neutral-300">{stop.caption}</p>
        </article>
    );
}
