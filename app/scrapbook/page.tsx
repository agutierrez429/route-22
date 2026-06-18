export const dynamic = "force-dynamic";

import MemoryCard from "@/components/MemoryCard";
import { supabase } from "@/lib/supabase";

export default async function ScrapbookPage() {
  const { data: memories, error } = await supabase
    .from("memories")
    .select("*")
    .order("memory_date", { ascending: true });

  if (error) {
    console.error(error);

    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-100 to-sky-100 px-4 py-8 text-slate-900 sm:p-10">
        Failed to load memories.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 px-4 py-4 text-slate-900 sm:px-6 sm:py-6">
      <section className="mx-auto max-w-5xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-pink-500 sm:text-sm sm:tracking-[0.35em]">
          Route 22 Archive
        </p>

        <h1 className="mb-4 text-3xl font-black leading-tight sm:text-4xl">
          The Scrapbook
        </h1>

        <p className="mb-8 max-w-2xl text-base text-slate-600">
          Every photo, video, caption, and little memory from the roadtrip lives
          here.
        </p>

        {memories && memories.length > 0 ? (
          <div className="columns-1 gap-4 sm:columns-2">
            {memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 text-center shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-black">No memories yet</h2>
            <p className="mt-2 text-sm text-slate-600">
              The scrapbook will fill up as Route 22 begins.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
