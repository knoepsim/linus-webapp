'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface VideoPlayerProps {
    videoId: string;
    title: string;
    watchUrl: string;
}

export default function VideoPlayer({ videoId, title, watchUrl }: VideoPlayerProps) {
    const [consentGiven, setConsentGiven] = useState(false);
    const [mounted, setMounted] = useState(false);

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    useEffect(() => {
        // Nach dem Mount den korrekten Consent-Status laden
        const hasPrivacyConsent = localStorage.getItem('privacy-consent') === 'true';

        if (hasPrivacyConsent) {
            const savedConsent = localStorage.getItem('youtube-consent');
            setConsentGiven(savedConsent === 'true');
        }
        setMounted(true);
    }, []);

    // Zustimmung speichern (nur wenn Privacy-Zustimmung gegeben)
    const handleConsent = () => {
        setConsentGiven(true);
        const hasPrivacyConsent = localStorage.getItem('privacy-consent') === 'true';

        if (hasPrivacyConsent) {
            localStorage.setItem('youtube-consent', 'true');
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {videoId ? (
                (() => {
                    return mounted && consentGiven ? (
                        // YouTube Embed nach Zustimmung (nur nach Mount)
                        <div className="relative h-64 overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/10 dark:shadow-black/30">
                            <iframe
                                className="h-full w-full"
                                src={embedUrl}
                                title={title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        // Thumbnail mit Play-Button (immer während SSR und wenn keine Zustimmung)
                        <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg shadow-black/10 dark:shadow-black/30 cursor-pointer group" onClick={handleConsent}>
                            <Image
                                src={thumbnailUrl}
                                alt={title}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    // Fallback zu default thumbnail falls hqdefault nicht verfügbar
                                    const target = e.target as HTMLImageElement;
                                    const fallbackUrl = `https://img.youtube.com/vi/${videoId}/default.jpg`;
                                    target.src = fallbackUrl;
                                }}
                            />
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
                            Hier wird bald das neueste Video angezeigt.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}