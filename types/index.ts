export type Stop = {
  id: string;
  senderName: string;
  title: string;
  caption: string;
  videoUrl: string;
  orderIndex: number;
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