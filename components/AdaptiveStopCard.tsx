"use client";

import { useState, type SyntheticEvent } from "react";
import type { Stop } from "@/types";

type VideoOrientation = "unknown" | "portrait" | "landscape" | "square";

type AdaptiveStopCardProps = {
  stop: Stop;
};

export default function AdaptiveStopCard({ stop }: AdaptiveStopCardProps) {
  const [orientation, setOrientation] = useState<VideoOrientation>("unknown");

  function handleLoadedMetadata(event: SyntheticEvent<HTMLVideoElement>) {
    const { videoHeight, videoWidth } = event.currentTarget;

    if (!videoHeight || !videoWidth) {
      return;
    }

    if (videoHeight > videoWidth) {
      setOrientation("portrait");
    } else if (videoWidth > videoHeight) {
      setOrientation("landscape");
    } else {
      setOrientation("square");
    }
  }

  const cardWidthClass =
    orientation === "landscape"
      ? "max-w-2xl"
      : orientation === "square"
      ? "max-w-xl"
      : "max-w-md";

  const videoSizeClass =
    orientation === "landscape"
      ? "w-full"
      : "max-h-[72vh] w-auto max-w-full";

  return (
    <article
      className={`mx-auto overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-md transition-[max-width] duration-300 ${cardWidthClass}`}
    >
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-pink-500">
        Stop {stop.orderIndex}
      </p>

      <h1 className="mb-4 text-4xl font-black">{stop.title}</h1>

      <p className="mb-6 font-semibold text-slate-500">
        From: {stop.senderName}
      </p>

      <div className="mb-6 flex justify-center rounded-2xl bg-slate-100 p-2 shadow-lg">
        <video
          src={stop.videoUrl}
          controls
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          className={`${videoSizeClass} rounded-xl bg-slate-200`}
        />
      </div>

      <p className="text-lg text-slate-700">{stop.caption}</p>
    </article>
  );
}
