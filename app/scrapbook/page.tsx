export const dynamic = "force-dynamic";

import AddMemoryButton from "@/components/AddMemoryButton";
import MemoryCard from "@/components/MemoryCard";
import { supabase } from "@/lib/supabase";

export default async function ScrapbookPage() {
  const { data: memories, error } = await supabase
    .from("memories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);

    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-100 to-sky-100 px-4 py-8 text-slate-900 sm:p-10">
        Failed to load memories.
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 px-4 py-8 pb-28 text-slate-900 sm:px-6 sm:py-10">
      <section className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-pink-500 sm:text-sm sm:tracking-[0.35em]">
          Route 22 Archive
        </p>

        <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl">
          The Scrapbook
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-slate-600">
          Every photo, video, caption, and little memory from the roadtrip lives
          here.
        </p>

        {memories && memories.length > 0 ? (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 text-center shadow-xl backdrop-blur-md">
            <h2 className="text-2xl font-black">No memories yet</h2>
            <p className="mt-2 text-slate-600">
              The scrapbook will fill up as Route 22 begins.
            </p>
          </div>
        )}
      </section>

      <AddMemoryButton />
    </main>
  );
}
