"use client";

import { useState } from "react";
import AdminNav from "@/components/AdminNav";
import { supabase } from "@/lib/supabase";

export default function StopsAdminPage() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");

  const [senderName, setSenderName] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!videoFile) {
      setStatus("Please choose a video.");
      return;
    }

    setStatus("Uploading video...");

    const fileExt = videoFile.name.split(".").pop();
    const safeName = videoFile.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");

    const filePath = `friend-videos/${Date.now()}-${safeName}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("route-22-media")
      .upload(filePath, videoFile);

    if (uploadError) {
      setStatus(uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from("route-22-media")
      .getPublicUrl(filePath);

    const { data: latestStop } = await supabase
      .from("stops")
      .select("order_index")
      .order("order_index", { ascending: false })
      .limit(1);

    const nextOrderIndex =
      latestStop && latestStop.length > 0
        ? latestStop[0].order_index + 1
        : 1;

    const { error: insertError } = await supabase.from("stops").insert({
      sender_name: senderName,
      title,
      caption,
      video_url: data.publicUrl,
      order_index: nextOrderIndex,
    });

    if (insertError) {
      setStatus(insertError.message);
      return;
    }

    setStatus("Stop added successfully!");
    setSenderName("");
    setTitle("");
    setCaption("");
    setVideoFile(null);
  }

  if (!isUnlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-200 via-orange-100 to-sky-200 px-6 text-slate-900">
        <section className="w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-pink-500">
            Route Manager
          </p>

          <h1 className="mb-6 text-3xl font-black">Add Friend Stop</h1>

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
          Add Friend Stop
        </h1>

        <AdminNav current="stops" />

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Friend name"
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
            required
          />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Stop title"
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
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
            required
          />

          <button
            type="submit"
            className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600"
          >
            Upload Stop
          </button>

          {status && <p className="font-semibold text-slate-600">{status}</p>}
        </form>
      </section>
    </main>
  );
}
