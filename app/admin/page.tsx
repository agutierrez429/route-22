"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [memoryDate, setMemoryDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setStatus("Please choose a file.");
      return;
    }

    setStatus("Uploading...");

    const fileExt = file.name.split(".").pop();
    const filePath = `${Date.now()}.${fileExt}`;

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

    const mediaType = file.type.startsWith("video") ? "video" : "image";

    const { error: insertError } = await supabase.from("memories").insert({
      title,
      caption,
      location,
      memory_date: memoryDate,
      media_url: data.publicUrl,
      media_type: mediaType,
    });

    if (insertError) {
      setStatus(insertError.message);
      return;
    }

    setStatus("Memory uploaded successfully!");
    setTitle("");
    setCaption("");
    setLocation("");
    setMemoryDate("");
    setFile(null);
  }

  if (!isUnlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-200 via-orange-100 to-sky-200 px-6 text-slate-900">
        <section className="w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-pink-500">
            Route Manager
          </p>

          <h1 className="mb-6 text-3xl font-black">Admin Access</h1>

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

        <h1 className="mb-6 text-5xl font-black">Add Memory</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Memory title"
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
            required
          />

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption"
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
          />

          <input
            type="date"
            value={memoryDate}
            onChange={(e) => setMemoryDate(e.target.value)}
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
            required
          />

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
            required
          />

          <button
            type="submit"
            className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600"
          >
            Upload Memory
          </button>

          {status && <p className="font-semibold text-slate-600">{status}</p>}
        </form>
      </section>
    </main>
  );
}