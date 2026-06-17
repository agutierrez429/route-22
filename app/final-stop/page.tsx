import Link from "next/link";

export default function FinalStopPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 px-6 py-10 text-slate-900">
      <section className="mx-auto max-w-2xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-500">
          Route 22
        </p>

        <h1 className="mb-4 text-5xl font-black">Final Stop</h1>

        <p className="mb-8 text-lg text-slate-600">
          There’s one more message before the road continues.
        </p>

        <video
          src="/videos/final-message.mp4"
          controls
          preload="metadata"
          className="mb-8 aspect-video w-full rounded-[2rem] bg-white shadow-2xl"
        />

        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-md">
          <p className="mb-4 text-lg text-slate-700">
            This started as a birthday surprise, but there’s one more part I
            wanted to give you.
          </p>

          <p className="text-slate-500">
            When you’re ready, open the next part of Route 22.
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/reveal"
            className="rounded-full bg-purple-500 px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-purple-600"
          >
            Reveal Route 22
          </Link>
        </div>
      </section>
    </main>
  );
}