'use client';

import { useState, useEffect } from 'react';
import VideoPlayer from '../VideoPlayer';

interface VideoData {
    title: string;
    firstParagraph: string;
    embedUrl: string;
    watchUrl: string;
}

interface VideoSectionProps {
    video: VideoData | null;
}

const fallbackVideo = {
    title: "Neuestes Video",
    firstParagraph:
        "Ein Fehler ist beim Laden aufgetreten.",
    embedUrl: "",
    watchUrl: "https://www.youtube.com/@lifelinus",
};

export default function VideoSection({ video: initialVideo }: VideoSectionProps) {
    const [video, setVideo] = useState<VideoData>(initialVideo || fallbackVideo);

    // Video ID aus embed URL extrahieren
    const getVideoId = (embedUrl: string) => {
        const match = embedUrl.match(/\/embed\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    };

    const videoId = getVideoId(video.embedUrl);

    // Client-seitiges Laden der YouTube Daten
    useEffect(() => {
        const loadVideoData = async () => {
            if (initialVideo) {
                setVideo(initialVideo);
                return;
            }

            try {
                const response = await fetch('/api/youtube/latest?channelId=UCpgCXddJZbfRCvzyHy4cdSQ');

                if (!response.ok) {
                    throw new Error(`API request failed: ${response.status}`);
                }

                const latestVideo = await response.json();

                if (latestVideo && latestVideo.embedUrl) {
                    setVideo(latestVideo);
                } else {
                    setVideo(fallbackVideo);
                }
            } catch (error) {
                console.error('Error loading video data:', error);
                setVideo(fallbackVideo);
            }
        };

        loadVideoData();
    }, [initialVideo]);

    return (
        <section className="rounded-3xl border border-border/20 bg-card/50 backdrop-blur-sm shadow-xl shadow-black/5 dark:shadow-black/20 p-10 transition-all duration-200 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
                <div className="space-y-6">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Neuestes @lifelinus YouTube-Video
                    </p>
                    <h3 className="text-3xl font-semibold text-card-foreground">
                        {video.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                        {video.firstParagraph}
                    </p>
                    {(video.embedUrl && videoId) ? (
                        <a
                            className="mr-2 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                            href={video.watchUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            zum Video
                        </a>
                    ) : (<></>)}

                    <a
                        className="inline-flex items-center rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/65"
                        href={fallbackVideo.watchUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        zum Kanal
                    </a>
                </div>
                <VideoPlayer videoId={videoId || ''} title={video.title} watchUrl={video.watchUrl} />
            </div>
        </section>
    );
}