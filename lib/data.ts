import { Stop } from "@/types";

export const stops: Stop[] = [
    {
        id: "1",
        senderName: "Friend 1",
        title: "First stop",
        caption: "A birthday message from someone who loves you.",
        videoUrl: "https://rejqxsfhhtonibwlmwqz.supabase.co/storage/v1/object/sign/birthday-videos/VID_20260617_121636.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lODMwYTE3OC1iZDk5LTRjNDMtODg3OC1lNWE1MzgyN2VjMzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaXJ0aGRheS12aWRlb3MvVklEXzIwMjYwNjE3XzEyMTYzNi5tcDQiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxNzM5NzY4LCJleHAiOjE4MTMyNzU3Njh9.bV0ga9jdb5BRCVHahODvQj6qjA25PNtj2lgf1dNvFOY",
        orderIndex: 1,
    },
    {
        id: "2",
        senderName: "Friend 2",
        title: "Second Stop",
        caption: "Another little stop along the way.",
        videoUrl: "/videos/friend-2.mp4",
        orderIndex: 2,
    },
    {
        id: "3",
        senderName: "Friend 3",
        title: "Final Friend Stop",
        caption: "One more message before the final stop.",
        videoUrl: "/videos/friend-2.mp4",
        orderIndex: 3,
    },
];
