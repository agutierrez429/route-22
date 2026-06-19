"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import { supabase } from "@/lib/supabase";
import type { Stop } from "@/types";

type StopOption = Pick<Stop, "id" | "sender_name" | "title" | "order_index">;

export default function StopPhotosAdminPage() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");

  const [availableStops, setAvailableStops] = useState<StopOption[]>([]);
  const [isLoadingStops, setIsLoadingStops] = useState(false);
  const [stopLoadError, setStopLoadError] = useState("");
  const [stopId, setStopId] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isUnlocked) {
      return;
    }

    async function loadStops() {
      setIsLoadingStops(true);
      setStopLoadError("");

      const { data, error } = await supabase
        .from("stops")
        .select("id, sender_name, title, order_index")
        .order("order_index", { ascending: true });

      if (error) {
        setStopLoadError(error.message);
        setAvailableStops([]);
        setStopId("");
      } else {
        const liveStops = (data ?? []) as StopOption[];

        setAvailableStops(liveStops);
        setStopId((currentStopId) => {
          if (liveStops.some((stop) => stop.id === currentStopId)) {
            return currentStopId;
          }

          return liveStops[0]?.id ?? "";
        });
      }

      setIsLoadingStops(false);
    }

    loadStops();
  }, [isUnlocked]);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stopId) {
      setStatus("Choose a stop before uploading photos.");
      return;
    }

    if (!files || files.length === 0) {
      setStatus("Choose at least one photo.");
      return;
    }

    setStatus(`Uploading ${files.length} photo(s)...`);

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const safeName = file.name
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9.-]/g, "");

      const filePath = `stops/${stopId}/${Date.now()}-${safeName}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("route-22-media")
        .upload(filePath, file);

      if (uploadError) {
        setStatus(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("route-22-media")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase.from("stop_photos").insert({
        stop_id: stopId,
        image_url: data.publicUrl,
        caption,
      });

      if (insertError) {
        setStatus(insertError.message);
        return;
      }
    }

    setStatus("Photos uploaded successfully!");
    setFiles(null);
    setCaption("");
  }

  if (!isUnlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-200 via-orange-100 to-sky-200 px-6 text-slate-900">
        <section className="w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-pink-500">
            Route Manager
          </p>

          <h1 className="mb-6 text-3xl font-black">Stop Photos</h1>

          <form
            onSubmit={(event) => {
              event.preventDefault();

              if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
                setIsUnlocked(true);
                setAuthError("");
              } else {
                setAuthError("Incorrect password");
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
            />

            <button
              type="submit"
              className="w-full rounded-full bg-pink-500 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-pink-600"
            >
              Unlock
            </button>

            {authError && <p className="text-sm text-red-500">{authError}</p>}
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 px-6 py-10 text-slate-900">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
          Route Manager
        </p>

        <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl">
          Bulk Add Stop Photos
        </h1>

        <AdminNav current="photos" />

        <form onSubmit={handleUpload} className="mt-6 space-y-5">
          <select
            value={stopId}
            onChange={(e) => setStopId(e.target.value)}
            disabled={isLoadingStops || availableStops.length === 0}
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
          >
            {availableStops.length === 0 && (
              <option value="">
                {isLoadingStops ? "Loading stops..." : "No stops found"}
              </option>
            )}

            {availableStops.map((stop) => (
              <option key={stop.id} value={stop.id}>
                Stop {stop.order_index}: {stop.sender_name} - {stop.title}
              </option>
            ))}
          </select>

          {isLoadingStops && (
            <p className="text-sm font-semibold text-slate-500">
              Loading stops...
            </p>
          )}

          {stopLoadError && (
            <p className="text-sm font-semibold text-red-500">
              {stopLoadError}
            </p>
          )}

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Optional caption for this batch"
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
            required
          />

          <button
            type="submit"
            disabled={!stopId || isLoadingStops}
            className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600"
          >
            Upload Photos
          </button>

          {status && <p className="font-semibold text-slate-600">{status}</p>}
        </form>
      </section>
    </main>
  );
}
