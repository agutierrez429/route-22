"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type StopPhoto = {
  id: string;
  stop_id: string;
  image_url: string;
  caption: string | null;
};

type StopPhotoGalleryProps = {
  stopId: string;
};

export default function StopPhotoGallery({ stopId }: StopPhotoGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const scrollDirectionRef = useRef(1);
  const resumeTimerRef = useRef<number | null>(null);
  const [photos, setPhotos] = useState<StopPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<StopPhoto | null>(null);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPhotos() {
      const { data, error } = await supabase
        .from("stop_photos")
        .select("*")
        .eq("stop_id", stopId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Could not load stop photos:", error.message);
        return;
      }

      if (isMounted && data) {
        setPhotos(data);
      }
    }

    loadPhotos();

    return () => {
      isMounted = false;
    };
  }, [stopId]);

  useEffect(() => {
    if (!selectedPhoto) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (
      !scroller ||
      photos.length < 2 ||
      selectedPhoto ||
      isAutoScrollPaused
    ) {
      return;
    }

    let animationFrame = 0;
    let previousTime = performance.now();
    const pixelsPerSecond = 118;

    function scrollPhotos(currentTime: number) {
      const element = scrollerRef.current;

      if (!element) {
        return;
      }

      const maxScrollLeft = element.scrollWidth - element.clientWidth;

      if (maxScrollLeft > 1) {
        const elapsedSeconds = Math.min(currentTime - previousTime, 80) / 1000;
        const nextScrollLeft =
          element.scrollLeft +
          scrollDirectionRef.current * pixelsPerSecond * elapsedSeconds;

        if (nextScrollLeft >= maxScrollLeft) {
          element.scrollLeft = maxScrollLeft;
          scrollDirectionRef.current = -1;
        } else if (nextScrollLeft <= 0) {
          element.scrollLeft = 0;
          scrollDirectionRef.current = 1;
        } else {
          element.scrollLeft = nextScrollLeft;
        }
      }

      previousTime = currentTime;
      animationFrame = requestAnimationFrame(scrollPhotos);
    }

    animationFrame = requestAnimationFrame(scrollPhotos);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [photos.length, selectedPhoto, isAutoScrollPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  function pauseAutoScroll() {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }

    setIsAutoScrollPaused(true);
  }

  function resumeAutoScroll(delay = 0) {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }

    if (delay > 0) {
      resumeTimerRef.current = window.setTimeout(() => {
        setIsAutoScrollPaused(false);
        resumeTimerRef.current = null;
      }, delay);
      return;
    }

    setIsAutoScrollPaused(false);
  }

  if (photos.length === 0) {
    return null;
  }

  return (
    <>
      <section className="mt-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Little Moments
        </p>

        <div
          ref={scrollerRef}
          data-stop-photo-scroller="true"
          className="flex gap-4 overflow-x-auto pb-4"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              resumeAutoScroll();
            }
          }}
          onFocus={pauseAutoScroll}
          onPointerCancel={() => resumeAutoScroll(1200)}
          onPointerDown={pauseAutoScroll}
          onPointerUp={() => resumeAutoScroll(1200)}
          onWheel={() => {
            pauseAutoScroll();
            resumeAutoScroll(1600);
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="w-fit max-w-[min(82vw,34rem)] shrink-0 overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-xl backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                className="block cursor-zoom-in transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-pink-300"
              >
                <img
                  src={photo.image_url}
                  alt={photo.caption ?? "Stop photo"}
                  className="block h-auto max-h-[32rem] w-auto max-w-full object-contain"
                />
              </button>

              {photo.caption && (
                <p className="p-4 text-sm font-semibold text-slate-600">
                  {photo.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            aria-label="Close photo preview"
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-black text-slate-900 shadow-lg transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            X
          </button>

          <figure
            className="max-h-[92vh] max-w-[94vw]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedPhoto.image_url}
              alt={selectedPhoto.caption ?? "Expanded stop photo"}
              className="block max-h-[84vh] max-w-[94vw] rounded-2xl object-contain shadow-2xl"
            />

            {selectedPhoto.caption && (
              <figcaption className="mx-auto mt-3 max-w-2xl rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-lg">
                {selectedPhoto.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
