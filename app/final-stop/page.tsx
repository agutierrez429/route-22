import Link from "next/link";
import AdaptiveVideo from "@/components/AdaptiveVideo";

export default function FinalStopPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 px-4 py-4 text-slate-900 sm:px-6 sm:py-6">
      <section className="mx-auto max-w-2xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-purple-500 sm:text-sm sm:tracking-[0.35em]">
          Route 22
        </p>

        <h1 className="mb-3 text-3xl font-black leading-tight sm:text-4xl">
          Final Stop
        </h1>

        <p className="mb-6 text-base text-slate-600">
          There&apos;s one more message before the road continues.
        </p>

        <AdaptiveVideo
          src="/videos/final-message.mp4"
          frameClassName="mb-6 bg-white"
          className="bg-white"
        />

        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur-md sm:p-5">
          <p className="mb-3 text-base text-slate-700">
            This started as a birthday surprise, but there&apos;s one more part I
            wanted to give you.
          </p>

          <p className="text-sm text-slate-500">
            When you&apos;re ready, open the next part of Route 22.
          </p>
        </div>

        <div className="mt-4 flex justify-stretch sm:justify-end">
          <Link
            href="/reveal"
            className="inline-flex w-full justify-center rounded-full bg-purple-500 px-8 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-purple-600 sm:w-auto"
          >
            Reveal Route 22
          </Link>
        </div>
      </section>
    </main>
  );
}
