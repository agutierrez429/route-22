"use client";

import { useState, type SyntheticEvent } from "react";

export type VideoOrientation = "unknown" | "portrait" | "landscape" | "square";

type AdaptiveVideoProps = {
  src: string;
  className?: string;
  frameClassName?: string;
  onOrientationChange?: (orientation: VideoOrientation) => void;
};

export default function AdaptiveVideo({
  src,
  className = "",
  frameClassName = "",
  onOrientationChange,
}: AdaptiveVideoProps) {
  const [orientation, setOrientation] =
    useState<VideoOrientation>("unknown");

  function handleLoadedMetadata(event: SyntheticEvent<HTMLVideoElement>) {
    const { videoHeight, videoWidth } = event.currentTarget;

    if (!videoHeight || !videoWidth) {
      return;
    }

    const nextOrientation =
      videoHeight > videoWidth
        ? "portrait"
        : videoWidth > videoHeight
        ? "landscape"
        : "square";

    setOrientation(nextOrientation);
    onOrientationChange?.(nextOrientation);
  }

  const mediaSizeClass =
    orientation === "landscape"
      ? "max-h-[48svh] w-full"
      : "h-auto max-h-[48svh] w-auto max-w-full";

  return (
    <div
      className={`flex justify-center rounded-2xl bg-slate-100 p-2 shadow-lg ${frameClassName}`}
      data-orientation={orientation}
    >
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        className={`${mediaSizeClass} rounded-xl bg-slate-200 object-contain ${className}`}
      />
    </div>
  );
}
