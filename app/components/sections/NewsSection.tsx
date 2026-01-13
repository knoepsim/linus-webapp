'use client';

import { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import Image from 'next/image';

interface VideoData {
    title: string;
    firstParagraph: string;
    embedUrl: string;
    watchUrl: string;
}

interface NewsSectionProps {
    video?: VideoData | null;
}

const fallbackVideo = {
    title: "Neuestes Video vom neuen Kanal",
    firstParagraph: "Ein Fehler ist beim Laden aufgetreten.",
    embedUrl: "",
    watchUrl: "https://www.youtube.com/@einblickmitlinus",
};

export default function NewsSection({ video: initialVideo }: NewsSectionProps) {
    const [video, setVideo] = useState<VideoData>(initialVideo || fallbackVideo);
    const [consentGiven, setConsentGiven] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Video ID aus embed URL extrahieren
    const getVideoId = (embedUrl: string) => {
        const match = embedUrl.match(/\/embed\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    };

    const videoId = getVideoId(video.embedUrl);
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

    // Client-seitiges Laden der YouTube Daten für den neuen Kanal
    useEffect(() => {
        const loadVideoData = async () => {
            if (initialVideo) {
                setVideo(initialVideo);
                return;
            }

            try {
                // Verwende die bestehende API-Route mit Query-Parameter für den neuen Kanal
                const newChannelId = process.env.NEXT_PUBLIC_NEW_YOUTUBE_CHANNEL_ID || 'UC_placeholder_new_channel';
                const response = await fetch(`/api/youtube/latest?channelId=${newChannelId}`);

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
                setVideo(fallbackVideo);
            }
        };

        loadVideoData();
    }, [initialVideo]);

    useEffect(() => {
        // Nach dem Mount den korrekten Consent-Status laden
        const hasPrivacyConsent = localStorage.getItem('privacy-consent') === 'true';

        if (hasPrivacyConsent) {
            const savedConsent = localStorage.getItem('youtube-consent-new-channel');
            setConsentGiven(savedConsent === 'true');
        }
        setMounted(true);
    }, []);

    // Zustimmung speichern (nur wenn Privacy-Zustimmung gegeben)
    const handleConsent = () => {
        setConsentGiven(true);
        const hasPrivacyConsent = localStorage.getItem('privacy-consent') === 'true';

        if (hasPrivacyConsent) {
            localStorage.setItem('youtube-consent-new-channel', 'true');
        }
    };

    return (
        <section id="news" className="rounded-3xl border border-border/20 bg-card/50 backdrop-blur-sm shadow-xl shadow-black/5 dark:shadow-black/20 p-10 transition-all duration-200 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] mb-10">
                {/* Linke Spalte: Informationen über den neuen Kanal */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-2">
                            <Info className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            Ankündigung
                        </p>
                    </div>

                    <h3 className="text-3xl font-semibold text-card-foreground">
                        2026 ist Zeit für Veränderung. 👀
                    </h3>

                    <div className="space-y-4 text-muted-foreground">
                        <p className="text-lg leading-relaxed">
                            Ich habe einen <strong>zweiten YouTube-Kanal</strong> zu gestartet!
                            Dieser neue Kanal wird sich auf ein spezielles Thema konzentrieren:
                            <br /><strong>Einblicke in Geschichten, Storys und Leben von anderen Menschen.</strong>
                        </p>


                        <div className="block">
                            <a
                                className="mr-2 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                                href={fallbackVideo.watchUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                zum @einnblickemitlinus
                            </a>

                            <a
                                className="inline-flex items-center rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/65"
                                href="https://www.instagram.com/p/DTbGNk-CGnr/?img_index=1"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ankündigung auf Instagram
                            </a>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col gap-4">

                    <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 border border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold mb-2">
                            Worum geht es?
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>• <strong>Authentische Geschichten:</strong> Einblicke in das Leben und die Erfahrungen anderer Menschen</li>
                            <li>• <strong>Persönliche Interviews:</strong> Tiefgehende Gespräche mit interessanten Persönlichkeiten</li>
                            <li>• <strong>Lebensgeschichten:</strong> Wie Menschen ihren Weg gehen und Herausforderungen meistern</li>
                            <li>• <strong>Inspiration & Motivation:</strong> Geschichten, die zum Nachdenken und Weiterentwickeln anregen</li>
                        </ul>
                    </div>
                </div>


            </div>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] mt-10">


                {/* Rechte Spalte: Neuestes Video vom neuen Kanal */}
                <div className="space-y-6">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Neuestes @einnblickemitlinus YouTube-Video
                    </p>

                    {video.embedUrl && videoId ? (
                        (() => {
                            return mounted && consentGiven ? (
                                // YouTube Embed nach Zustimmung (nur nach Mount)
                                <div className="relative h-64 overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/10 dark:shadow-black/30">
                                    <iframe
                                        className="h-full w-full"
                                        src={video.embedUrl}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                // Thumbnail mit Play-Button (immer während SSR und wenn keine Zustimmung)
                                <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg shadow-black/10 dark:shadow-black/30 cursor-pointer group" onClick={handleConsent}>
                                    {thumbnailUrl && (
                                        <Image
                                            src={thumbnailUrl}
                                            alt={video.title}
                                            fill
                                            className="object-cover"
                                            onError={(e) => {
                                                // Fallback zu default thumbnail falls maxresdefault nicht verfügbar
                                                const target = e.target as HTMLImageElement;
                                                const fallbackUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                                target.src = fallbackUrl;
                                            }}
                                        />
                                    )}
                                    {/* Overlay mit Play-Button */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                                        <div className="flex flex-col items-center gap-4 text-center text-white">
                                            <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 group-hover:bg-white/30 transition-colors">
                                                <Play className="h-8 w-8 fill-white" />
                                            </div>
                                            <div className="space-y-2 px-4">
                                                <p className="text-sm font-medium">
                                                    Externen YouTube Content laden?
                                                </p>
                                                <p className="text-xs opacity-90">
                                                    Klicke hier um das Video anzusehen
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()
                    ) : (
                        // Fallback für fehlende Daten
                        (() => {
                            return (
                                <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/10 dark:shadow-black/30">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#f4f4f5,_transparent_60%)]" />
                                    <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                                        <span className="rounded-full border border-zinc-200 px-4 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400">
                                            neues video
                                        </span>
                                        <p className="text-lg font-semibold text-zinc-900">
                                            Neuestes Video
                                        </p>
                                        <p className="text-sm text-zinc-500">
                                            Hier wird bald das neueste Video vom neuen Kanal angezeigt.
                                        </p>
                                    </div>
                                </div>
                            );
                        })()
                    )}
                </div>
                <div className="flex flex-col gap-4">

                    <h3 className="text-3xl font-semibold text-card-foreground">
                        {video.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                        {video.firstParagraph}
                    </p>
                    <div className="block">
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

                </div>
            </div>
        </section>
    );
}
