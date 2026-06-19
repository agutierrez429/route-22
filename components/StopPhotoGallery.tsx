"use client";

import { useEffect, useState } from "react";
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
  const [photos, setPhotos] = useState<StopPhoto[]>([]);

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

  if (photos.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
        Little Moments
      </p>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="min-w-[240px] overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-xl backdrop-blur-md"
          >
            <img
              src={photo.image_url}
              alt={photo.caption ?? "Stop photo"}
              className="h-72 w-full object-cover"
            />

            {photo.caption && (
              <p className="p-4 text-sm font-semibold text-slate-600">
                {photo.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
