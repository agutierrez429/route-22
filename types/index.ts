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
    mediaUrl: string;
    mediaType: "image" | "video";
    location: string;
    memoryDate: string;
};