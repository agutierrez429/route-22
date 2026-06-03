import MemoryCard from "@/components/MemoryCard";
import { memories } from "@/lib/data";

export default function ScrapbookPage(){
    return (
        <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
            <section className="mx-auto max-w-5xl">
                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
                    Route 22 Archive
                </p>

                <h1 className="mb-6 text-5xl font-bold">The Scrapbook</h1>

                <p className="mb-10 max-w-2xl text-neutral-400">
                    This is where the photos, videos, captions, and little memories from
                    the roadtrip will live.
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                    {memories.map((memory) => (
                        <MemoryCard key={memory.id} memory={memory} />
                    ))}
                </div>
            </section>
        </main>
    );
}