"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddMemoryButton() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [memoryDate, setMemoryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setStatus("Please choose a photo or video.");
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

    setStatus("Memory added!");
    setTitle("");
    setCaption("");
    setLocation("");
    setMemoryDate(new Date().toISOString().split("T")[0]);
    setFile(null);
    setIsOpen(false);

    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-4xl font-black text-white shadow-2xl transition hover:-translate-y-1 hover:bg-pink-600"
        aria-label="Add memory"
      >
        +
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-4 sm:items-center sm:pb-0">
          <section className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white p-6 text-slate-900 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-pink-500">
                  Route 22
                </p>
                <h2 className="text-3xl font-black">Add Memory</h2>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-slate-100 px-4 py-2 font-bold text-slate-600"
              >
                X
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full rounded-full bg-pink-500 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-pink-600"
              >
                Save Memory
              </button>

              {status && <p className="font-semibold text-slate-600">{status}</p>}
            </form>
          </section>
        </div>
      )}
    </>
  );
}