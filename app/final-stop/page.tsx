import Link from "next/link";

export default function FinalStopPage() {
    return (
        <main className = "min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
            <h1 className = "text-5xl font-bold mb-6">
                Final Stop
            </h1>

            <p className = "text-neutral-400 text-center max-w-lg mb-8">
                There's one more message waiting for you.
            </p>

            <Link
                href= "/reveal"
                className = "bg-white text-black px-6 py-3 rounded-full font-medium hover:opacity-80 transition"
            >
                Open Final Message
            </Link>
        </main>
    );
}