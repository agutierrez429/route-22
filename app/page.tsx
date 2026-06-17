import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-orange-100 to-sky-200 px-6 text-slate-900">
      <div className="absolute left-10 top-16 h-40 w-40 rounded-full bg-yellow-300/50 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-52 w-52 rounded-full bg-pink-400/40 blur-3xl" />
      <div className="absolute right-1/3 top-1/3 h-36 w-36 rounded-full bg-sky-400/40 blur-3xl" />

      <section className="relative z-10 max-w-2xl rounded-[2rem] border border-white/70 bg-white/70 p-8 text-center shadow-2xl backdrop-blur-md">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-pink-500">
          Route 22
        </p>

        <h1 className="mb-6 text-5xl font-black sm:text-7xl">
          Happy Birthday
        </h1>

        <p className="mb-8 text-lg text-slate-600">
          Before today ends, there are a few people who would like to say
          something.
        </p>

        <Link
          href="/intro"
          className="inline-flex rounded-full bg-pink-500 px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-pink-600"
        >
          Begin Route
        </Link>
      </section>
    </main>
  );
}