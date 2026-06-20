type RouteProgressProps = {
  currentIndex: number;
  totalStops: number;
};

const iconClass =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl shadow-md transition";

const lineClass = "h-1.5 flex-1 rounded-full";

export default function RouteProgress({
  currentIndex,
  totalStops,
}: RouteProgressProps) {
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < totalStops - 1;

  return (
    <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-lg backdrop-blur-md">
      <style>
        {`
          @keyframes route-bounce {
            0%, 100% { transform: translateY(0) scale(1.08); }
            50% { transform: translateY(-6px) scale(1.12); }
          }

          @keyframes route-fill {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }

          @keyframes route-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.08); opacity: 0.85; }
          }
        `}
      </style>

      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-500 sm:text-sm">
          Route Progress
        </p>

        <p className="text-xs font-bold text-slate-500 sm:text-sm">
          Stop {currentIndex + 1}
        </p>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2">
        <div
          className={`${iconClass} ${
            hasPrevious ? "bg-orange-400 text-white" : "bg-green-400 text-white"
          }`}
          title={hasPrevious ? "Previous stops completed" : "Home"}
        >
          {hasPrevious ? "📍" : "🏠"}
        </div>

        <div className={`${lineClass} origin-left overflow-hidden bg-slate-200`}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
            style={{
              animation: "route-fill 700ms ease-out both",
            }}
          />
        </div>

        <div
          className={`${iconClass} h-14 w-14 bg-pink-500 text-2xl text-white`}
          title={`Stop ${currentIndex + 1}`}
          style={{
            animation: "route-bounce 1.8s ease-in-out infinite",
          }}
        >
          🚘
        </div>

        <div
          className={`${lineClass} ${
            hasNext ? "bg-slate-200" : "bg-gradient-to-r from-pink-500 to-yellow-300"
          }`}
        />

        <div
          className={`${iconClass} ${
            hasNext ? "bg-white text-slate-400" : "bg-yellow-300 text-slate-900"
          }`}
          title={hasNext ? "Next stop hidden" : "Final reveal"}
          style={{
            animation: hasNext
              ? "route-pulse 1.8s ease-in-out infinite"
              : "route-pulse 1.8s ease-in-out infinite",
          }}
        >
          {hasNext ? "✨" : "🎁"}
        </div>
      </div>
    </div>
  );
}