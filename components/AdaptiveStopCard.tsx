"use client";

import { useState } from "react";
import AdaptiveVideo, { type VideoOrientation } from "@/components/AdaptiveVideo";
import type { Stop } from "@/types";

type AdaptiveStopCardProps = {
  stop: Stop;
};

export default function AdaptiveStopCard({ stop }: AdaptiveStopCardProps) {
  const [orientation, setOrientation] = useState<VideoOrientation>("unknown");

  const cardWidthClass =
    orientation === "unknown"
      ? "max-w-3xl"
      : orientation === "landscape"
      ? "max-w-5xl"
      : orientation === "square"
      ? "max-w-2xl"
      : "max-w-lg";

  return (
    <article
      className={`mx-auto w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-2 shadow-2xl backdrop-blur-md transition-[max-width] duration-300 sm:p-3 ${cardWidthClass}`}
    >
      <AdaptiveVideo
        src={stop.videoUrl}
        frameClassName="bg-white/70 shadow-2xl"
        onOrientationChange={setOrientation}
      />

      <div className="p-2 sm:p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pink-500 sm:text-sm">
            Stop {stop.orderIndex}
          </p>

          <p className="text-sm font-semibold text-slate-500">From: {stop.senderName}</p>
        </div>

        <h1 className="text-2xl font-black leading-tight sm:text-3xl">
          {stop.title}
        </h1>

        <p className="mt-2 text-base text-slate-700">{stop.caption}</p>
      </div>
    </article>
  );
}
