import Link from "next/link";

export default function IntroPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 px-4 py-4 text-slate-900 sm:px-6">
      <section className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/75 p-4 text-center shadow-2xl backdrop-blur-md sm:p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-orange-500 sm:text-sm sm:tracking-[0.35em]">
          Have Fun!
        </p>

        <h1 className="mb-4 text-3xl font-black leading-tight sm:text-4xl">
          A few birthday stops
        </h1>

        <p className="mb-6 text-base text-slate-600">
          Take your time with each stop
        </p>

        <Link
          href="/stops/1"
          className="inline-flex w-full justify-center rounded-full bg-orange-500 px-8 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600 sm:w-auto"
        >
          Start Stop 1
        </Link>
      </section>
    </main>
  );
}
