"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import {
  FINAL_STOP_CONTENT_ID,
  defaultFinalStopContent,
  mergeFinalStopContent,
} from "@/lib/finalStop";
import { supabase } from "@/lib/supabase";
import type { FinalStopContent } from "@/types";

export default function FinalStopAdminPage() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");

  const [videoUrl, setVideoUrl] = useState(defaultFinalStopContent.video_url);
  const [introText, setIntroText] = useState(
    defaultFinalStopContent.intro_text
  );
  const [bodyText, setBodyText] = useState(defaultFinalStopContent.body_text);
  const [hintText, setHintText] = useState(defaultFinalStopContent.hint_text);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [alsoCreateStop, setAlsoCreateStop] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isUnlocked) {
      return;
    }

    async function loadFinalStopContent() {
      setIsLoadingContent(true);
      setStatus("");

      const { data, error } = await supabase
        .from("final_stop")
        .select("id, video_url, intro_text, body_text, hint_text")
        .eq("id", FINAL_STOP_CONTENT_ID)
        .maybeSingle();

      if (error) {
        setStatus(`Using defaults: ${error.message}`);
      } else {
        const content = mergeFinalStopContent(
          data as Partial<FinalStopContent> | null
        );

        setVideoUrl(content.video_url);
        setIntroText(content.intro_text);
        setBodyText(content.body_text);
        setHintText(content.hint_text);
      }

      setIsLoadingContent(false);
    }

    loadFinalStopContent();
  }, [isUnlocked]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let nextVideoUrl = videoUrl.trim() || defaultFinalStopContent.video_url;

    if (videoFile) {
      setStatus("Uploading final stop video...");

      const fileExt = videoFile.name.includes(".")
        ? videoFile.name.split(".").pop()
        : "mp4";
      const safeBaseName =
        videoFile.name
          .replace(/\.[^/.]+$/, "")
          .replace(/\s+/g, "-")
          .replace(/[^a-zA-Z0-9-]/g, "") || "final-message";
      const filePath = `final-stop/${Date.now()}-${safeBaseName}.${fileExt}`;

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

      nextVideoUrl = data.publicUrl;
      setVideoUrl(nextVideoUrl);
    }

    setStatus("Saving final stop...");

    const { error: saveError } = await supabase.from("final_stop").upsert(
      {
        id: FINAL_STOP_CONTENT_ID,
        video_url: nextVideoUrl,
        intro_text: introText,
        body_text: bodyText,
        hint_text: hintText,
      },
      { onConflict: "id" }
    );

    if (saveError) {
      setStatus(saveError.message);
      return;
    }

    // Optionally also create a normal stop entry (mirrors Add Friend Stop behavior)
    if (alsoCreateStop) {
      setStatus("Creating a stop entry...");

      const { data: latestStop } = await supabase
        .from("stops")
        .select("order_index")
        .order("order_index", { ascending: false })
        .limit(1);

      const nextOrderIndex =
        latestStop && latestStop.length > 0 ? latestStop[0].order_index + 1 : 1;

      const { error: insertError } = await supabase.from("stops").insert({
        sender_name: "Final",
        title: "Final Stop",
        caption: introText || bodyText || "Final message",
        video_url: nextVideoUrl,
        order_index: nextOrderIndex,
      });

      if (insertError) {
        setStatus(insertError.message);
        return;
      }
    }

    setVideoFile(null);
    setStatus("Final stop saved successfully!");
  }

  if (!isUnlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-200 via-orange-100 to-sky-200 px-4 py-8 text-slate-900 sm:px-6">
        <section className="w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-2xl backdrop-blur-md sm:p-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-pink-500 sm:text-sm sm:tracking-[0.35em]">
            Route Manager
          </p>

          <h1 className="mb-6 text-3xl font-black">Final Stop</h1>

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
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 px-4 py-8 text-slate-900 sm:px-6 sm:py-10">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-2xl backdrop-blur-md sm:p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-orange-500 sm:text-sm sm:tracking-[0.35em]">
          Route Manager
        </p>

        <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl">
          Final Stop
        </h1>

        <AdminNav current="final" />

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Final stop video URL"
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
            required
          />

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
          />

          <textarea
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
            placeholder="Intro text"
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
            required
          />

          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            placeholder="Message text"
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
            required
          />

          <textarea
            value={hintText}
            onChange={(e) => setHintText(e.target.value)}
            placeholder="Hint text"
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3"
            required
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={alsoCreateStop}
              onChange={(e) => setAlsoCreateStop(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            <span className="text-sm">Also create a Friend Stop entry</span>
          </label>

          <button
            type="submit"
            disabled={isLoadingContent}
            className="w-full rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Save Final Stop
          </button>

          {status && <p className="font-semibold text-slate-600">{status}</p>}
        </form>
      </section>
    </main>
  );
}
