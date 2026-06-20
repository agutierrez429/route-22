export type Stop = {
  id: string;
  sender_name: string;
  title: string;
  caption: string | null;
  video_url: string;
  order_index: number;
  created_at?: string;
};

export type Memory = {
  id: string;
  title: string;
  caption: string;
  media_url: string;
  media_type: "image" | "video";
  location: string;
  memory_date: string;
};

export type FinalStopContent = {
  id: string;
  video_url: string;
  intro_text: string;
  body_text: string;
  hint_text: string;
};
