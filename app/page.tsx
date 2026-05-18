import Link from "next/link";

export default function HomePage(){
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white px-6">
        <h1 className = "text-5xl font-bold mb-4">Route 22</h1>

        <p className = "text-neautral-480 text-center max-w-md mb-8">
          A little birthday detour made just for you.
        </p>

        <Link
          href = "/intro"
          className = "bg-white text-black px-6 py-3 rounded-full font-medium hover:opacity-80 transition"
        >
          Start Route
        </Link>
    </main>
  );
}
