import Link from "next/link";

export default function IntroPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 px-6 text-slate-900">
      <section className="max-w-2xl rounded-[2rem] border border-white/70 bg-white/75 p-8 text-center shadow-2xl backdrop-blur-md">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
          Before the road begins
        </p>

        <h1 className="mb-6 text-5xl font-black">A few birthday stops</h1>

        <p className="mb-8 text-lg text-slate-600">
          Some people wanted to send you love today. Take your time with each
          stop along the way.
        </p>

        <Link
          href="/stops/1"
          className="inline-flex rounded-full bg-orange-500 px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600"
        >
          Start Stop 1
        </Link>
      </section>
    </main>
  );
}