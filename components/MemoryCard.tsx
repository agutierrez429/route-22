import type { Memory } from "@/types";

type MemoryCardProps = {
  memory: Memory;
};

export default function MemoryCard({ memory }: MemoryCardProps) {
  return (
    <article className="mb-6 break-inside-avoid overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl">
      {memory.media_type === "image" ? (
        <img
          src={memory.media_url}
          alt={memory.title}
          className="max-h-[34rem] w-full bg-slate-100 object-contain"
        />
      ) : (
        <video
          src={memory.media_url}
          controls
          playsInline
          preload="metadata"
          className="max-h-[34rem] w-full bg-slate-100 object-contain"
        />
      )}

      <div className="p-5">
        <p className="mb-2 text-sm font-bold text-pink-500">
          {memory.memory_date} &middot; {memory.location}
        </p>

        <h2 className="text-2xl font-black text-slate-900">{memory.title}</h2>

        <p className="mt-2 text-slate-600">{memory.caption}</p>
      </div>
    </article>
  );
}
