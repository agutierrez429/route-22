import Link from "next/link";

export default function RevealPage(){
    return (
        <main className = "min-h-screen bg-neutral-950 text-white px-6 py-10">
            <section className="mx-auto max-w-3xl">
            <p className= "mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
                Route 22 Continues
            </p>

            <h1 className = "mb-6 text-5xl font-bold">
                We&apos;re going on a roadtrip.
            </h1>

            <p className = "mb-10 max-w-2xl text-lg text-neutral-400">
                This birthday surprise does not end here. The next part is something
                we get to experience together.
            </p>

            <div className="mb-10 rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
                <p className="mb-4 text-sm uppercase tracking-[0.25em] text-neutral-500">
                    The Route
                </p>

                <div className="flex flex-col gap-4 text-2xl font-semibold sm:flex-row sm:items-center sm:justify-between">
                    <span>Montclair, CA</span>
                    <span className="text-neutral-500">→</span>
                    <span>Seattle, WA</span>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-neutral-800">
                    <div className="h-full w-2/3 rounded-full bg-white">
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                        <p className="mb-2 text-sm text-neutral-500">Plan</p>
                        <h2 className="text-xl font-semibold">Head North</h2>
                        <p className="mt-2 text-sm text-neutral-400">
                            A birthday trip built around good views, good food, and time together.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                        <p className="mb-2 text-sm text-neutral-500">Mission</p>
                        <h2 className="text-xl font-semibold">Make Memories</h2>
                        <p className="mt-2 text-sm text-neutral-400">
                            Take pictures, collect little moments, and save them here.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                        <p className="mb-2 text-sm text-neutral-500">Archive</p>
                        <h2 className="text-xl font-semibold">Build The Scrapbook</h2>
                        <p className="mt-2 text-sm text-neutral-400">
                            Route 22 becomes the place where this trip lives.
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex justify-end">
                    <Link 
                    href="/scrapbook"
                    className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:opacity-80"
                    >
                        Open Scrapbook
                    </Link>
                </div>
            </div>
            </section>
        </main>
    );
}
