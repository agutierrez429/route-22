import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-6 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
      </div>

      <section className="relative z-10 max-w-2xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-neutral-500">
          Route 22
        </p>

        <h1 className="mb-6 text-5xl font-bold sm:text-6xl">
          Happy Birthday, My Love
        </h1>

        <p className="mb-8 text-lg text-neutral-400">
          Before today ends, there&apos;s one more adventure waiting for you.
        </p>

        <Link
          href="/intro"
          className="rounded-full bg-white px-8 py-4 font-medium text-black transition hover:opacity-80"
        >
          Begin Route
        </Link>
      </section>
    </main>
  );
}