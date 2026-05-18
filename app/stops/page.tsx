import Link from "next/link";

const stops = [
    {
        id: 1,
        sender: "Sarah",
        message: "Happy birthday. I love you so much.",
    },
    {
        id: 2,
        sender: "David",
        message: " Hope this year is amazing for you.",
    },
];

export default function StopsPage(){
    return (
        <main className = "min-h-screen bg-neutral-950 text-white px-6 py-12">
            <h1 className = "text-4xl font-bold mb-10 text-center">
                Route Stops
            </h1>

            <div className = "max-w-2xl mx-auto spcae-y-6">
                {stops.map((stop) => (
                    <div
                    key = {stop.id}
                    className = "bg-neutral-900 border border-neatral-800 rounded-2xl p-6"
                    >
                        <h2 className= "text-2xl font-semibold mb-2">
                            Stop {stop.id}
                        </h2>

                        <p className = "text-neutral-400 mb-4">
                            From: {stop.sender}
                        </p>

                        <p>{stop.message}</p>
                    </div>
                ))}

            <div className = "flex justify-center pt-8">
                <Link
                    href = "/final-stop"
                    className = "bg-white text-black px-6 py-3 rounded-full font-medium hover:opacity-80 transition"
                >
                    Final Stop
                </Link>
            </div>
            </div>
        </main>
    );

}