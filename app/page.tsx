import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-orange-100 to-sky-200 px-4 py-4 text-slate-900 sm:px-6">
      <section className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/70 p-4 text-center shadow-2xl backdrop-blur-md sm:p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-pink-500 sm:text-sm sm:tracking-[0.4em]">
          Route 22
        </p>

        <h1 className="mb-4 text-3xl font-black leading-none sm:text-5xl md:text-6xl">
          Happy Birthday, My Love
        </h1>

        <p className="mb-6 text-base text-slate-600">
          Before today ends, there are a few messages
        </p>

        <Link
          href="/intro"
          className="inline-flex w-full justify-center rounded-full bg-pink-500 px-8 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-pink-600 sm:w-auto"
        >
          Begin Route
        </Link>
      </section>
    </main>
  );
}
