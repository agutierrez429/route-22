import Link from "next/link";

export default function IntroPage(){
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
            <h1 className="text-4xl font-bold mb-6">
                Before the road begins...
            </h1>

            <p className = "text-neutral-400 text-center max-w-lg mb-8">
                Some people wanted to say something to you.
                Take your time with each stop along the way.
            </p>

            <Link
                href= "/stops"
                className="bg-white text-black px-6 py-3 rounded-full font-medium hover:opacity-80 transition"
            >
                Begin Route
            </Link>
        </main>
    );
}