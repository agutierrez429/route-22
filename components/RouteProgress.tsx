type RouteProgressProps = {
  currentIndex: number;
  totalStops: number;
};

export default function RouteProgress({
  currentIndex,
  totalStops,
}: RouteProgressProps) {
  const points = Array.from({ length: totalStops }, (_, index) => index);

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur-md">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-sky-500">
        Route Progress
      </p>

      <div className="flex items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-400 text-xl shadow-md">
          🏠
        </div>

        <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-500" />

        {points.map((point, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isSegmentFilled = index < currentIndex;

          return (
            <div
              key={point}
              className="flex flex-1 items-center last:flex-none"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl shadow-md transition ${
                  isCurrent
                    ? "scale-110 bg-pink-500 text-white"
                    : isCompleted
                    ? "bg-orange-400 text-white"
                    : "bg-white text-slate-400"
                }`}
              >
                {isCurrent ? "🚘" : "📍"}
              </div>

              {index < totalStops - 1 && (
                <div
                  className={`h-2 flex-1 rounded-full ${
                    isSegmentFilled
                      ? "bg-gradient-to-r from-orange-400 to-pink-500"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}

        <div className="ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-xl shadow-md">
          🎁
        </div>
      </div>

      
    </div>
  );
}