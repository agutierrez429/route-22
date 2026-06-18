type RouteProgressProps = {
  currentIndex: number;
  totalStops: number;
};

const routeIconClass =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base shadow-md transition sm:h-11 sm:w-11 sm:text-xl";

const segmentClass = "h-2 min-w-4 flex-1 rounded-full transition-colors";

export default function RouteProgress({
  currentIndex,
  totalStops,
}: RouteProgressProps) {
  const points = Array.from({ length: totalStops }, (_, index) => index);
  const progressPercent = Math.round(
    ((currentIndex + 1) / (totalStops + 1)) * 100
  );

  return (
    <div className="rounded-[1.5rem] border border-white/70 bg-white/75 p-3 shadow-lg backdrop-blur-md sm:p-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-500 sm:text-sm sm:tracking-[0.35em]">
          Route Progress
        </p>

        <p className="text-sm font-bold text-slate-500">
          Stop {currentIndex + 1} of {totalStops}
        </p>
      </div>

      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 sm:hidden"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-3 overflow-x-auto px-1 py-1">
        <div
          aria-label={`Route is ${progressPercent}% complete`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progressPercent}
          className="flex min-w-[18rem] items-center gap-1 sm:min-w-0 sm:gap-2"
          role="progressbar"
        >
          <div
            aria-label="Home"
            className={`${routeIconClass} bg-green-400 text-white`}
            title="Home"
          >
            <span aria-hidden="true">🏠</span>
          </div>

          {points.map((point, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isReached = index <= currentIndex;

            return (
              <div key={point} className="contents">
                <div
                  className={`${segmentClass} ${
                    isReached
                      ? "bg-gradient-to-r from-orange-400 to-pink-500"
                      : "bg-slate-200"
                  }`}
                />

                <div
                  aria-label={`Stop ${index + 1}${
                    isCurrent ? ", current stop" : ""
                  }`}
                  className={`${routeIconClass} ${
                    isCurrent
                      ? "scale-110 bg-pink-500 text-white"
                      : isCompleted
                      ? "bg-orange-400 text-white"
                      : "bg-white text-slate-400"
                  }`}
                  title={`Stop ${index + 1}`}
                >
                  <span aria-hidden="true">
                    {isCurrent ? "🚘" : "📍"}
                  </span>
                </div>
              </div>
            );
          })}

          <div className={`${segmentClass} bg-slate-200`} />

          <div
            aria-label="Final reveal"
            className={`${routeIconClass} bg-yellow-300 text-slate-900`}
            title="Final reveal"
          >
            <span aria-hidden="true">🎁</span>
          </div>
        </div>
      </div>
    </div>
  );
}
