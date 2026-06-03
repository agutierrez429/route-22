import { Stop, Memory } from "@/types";

export const stops: Stop[] = [
    {
        id: "1",
        senderName: "Friend 1",
        title: "First stop",
        caption: "A birthday message from someone who loves you.",
        videoUrl: "/videos/friend-1.mp4",
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

//import { Memory } from "@types";

export const memories: Memory[] = [
    {
        id: "1",
        title: "First stop",
        caption: "The beginning of Route 22.",
        mediaUrl: "/images/memory-1.jpg",
        mediaType: "image",
        location: "Montclair, CA",
        memoryDate: "2024-06-22",
    },
    {
        id: "2",
        title: "On the road",
        caption: "Somewhere between here and the next memory.",
        mediaUrl: "/images/memory-2.jpg",
        mediaType: "image",
        location: "California",
        memoryDate: "2024-06-23",
    },
];