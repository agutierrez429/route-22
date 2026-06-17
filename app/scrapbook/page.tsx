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
      <main className="min-h-screen bg-gradient-to-br from-pink-100 to-sky-100 p-10 text-slate-900">
        Failed to load memories.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 px-6 py-10 text-slate-900">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-pink-500">
          Route 22 Archive
        </p>

        <h1 className="mb-6 text-5xl font-black">The Scrapbook</h1>

        <p className="mb-10 max-w-2xl text-lg text-slate-600">
          Every photo, video, caption, and little memory from the roadtrip lives
          here.
        </p>

        {memories && memories.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
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
    </main>
  );
}