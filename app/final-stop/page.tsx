import Link from "next/link";

export default function FinalStopPage() {
    return (
        <main className = "min-h-screen bg-black px-6 py-10 text-white">
            <section className="mx-auto flex max-w-2xl flex-col justify-center">
                <p className ="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
                    Route 22
                </p>
                <h1 className = "mb-4 text-5xl font-bold">
                    Final Stop
                </h1>

                <p className = "mb-8 text-neutral-400">
                    There's one more message before the road continues.                </p>

                <video
                    src="/videos/final-message.mp4"
                    controls
                    preload="metadata"
                    className="mb-8 aspect-video w-full rounded-2xl bg-neutral-900"
                />

                <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6">
                    <p className="mb-4 text-neutral-300">
                        This started as a birthday surprise, but there's one more part I wanted to give you.
                    </p>

                    <p className="text-neutral-400">
                        When you're ready, open the next part of Route 22.
                    </p>
                </div>

                <div className="mt-8 flex justify-end">
                    <Link
                        href= "/reveal"
                        className = "rounded-full bg-white px-6 py-3 font-medium text-black transition hover:opacity-80"
                    >
                        Route 22
                    </Link>
                </div>
            </section>
        </main>
    );
}