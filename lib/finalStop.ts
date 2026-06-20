import type { FinalStopContent } from "@/types";

export const FINAL_STOP_CONTENT_ID = "main";

export const defaultFinalStopContent: FinalStopContent = {
  id: FINAL_STOP_CONTENT_ID,
  video_url: "/videos/final-message.mp4",
  intro_text: "There's one more message before the road continues.",
  body_text:
    "This started as a birthday surprise, but there's one more part I wanted to give you.",
  hint_text: "When you're ready, open the next part of Route 22.",
};

export function mergeFinalStopContent(
  content?: Partial<FinalStopContent> | null
): FinalStopContent {
  return {
    ...defaultFinalStopContent,
    ...content,
    id: content?.id || defaultFinalStopContent.id,
    video_url: content?.video_url || defaultFinalStopContent.video_url,
    intro_text: content?.intro_text || defaultFinalStopContent.intro_text,
    body_text: content?.body_text || defaultFinalStopContent.body_text,
    hint_text: content?.hint_text || defaultFinalStopContent.hint_text,
  };
}
