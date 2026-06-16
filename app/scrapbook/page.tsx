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
      <main className="min-h-screen bg-neutral-950 p-10 text-white">
        Failed to load memories.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
          Route 22 Archive
        </p>

        <h1 className="mb-6 text-5xl font-bold">
          The Scrapbook
        </h1>

        <p className="mb-10 max-w-2xl text-neutral-400">
          Every memory from the roadtrip lives here.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {memories?.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
            />
          ))}
        </div>
      </section>
    </main>
  );
}