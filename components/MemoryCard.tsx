import type { Memory } from "@/types";

type MemoryCardProps = {
    memory: Memory;
};

export default function MemoryCard({ memory }: MemoryCardProps) {
    return (
        <article className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900">
            {memory.media_type === "image" ? (
                <img
                    src={memory.media_url}
                    alt={memory.title}
                    className="aspect-[4/3] w-full object-cover"
                />
            ) : (
                <video
                    src={memory.media_url}
                    controls
                    preload="metadata"
                    className="aspect-[4/3] w-full object-cover"
                />
            )}

            <div className="p-5">
                <p className="mb-2 text-sm text-neutral-500">
                    {memory.memory_date} · {memory.location} 
                </p>

                <h2 className="text-xl font-semibold">{memory.title}</h2>

                <p className="mt-2 text-neutral-400">{memory.caption}</p>
            </div>
        </article>
    );
}