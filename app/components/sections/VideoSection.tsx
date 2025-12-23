'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface VideoData {
  title: string;
  firstParagraph: string;
  embedUrl: string;
  watchUrl: string;
}

interface VideoSectionProps {
  video: VideoData;
}

export default function VideoSection({ video }: VideoSectionProps) {
  const [consentGiven, setConsentGiven] = useState(false);

  // Video ID aus embed URL extrahieren
  const getVideoId = (embedUrl: string) => {
    const match = embedUrl.match(/\/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(video.embedUrl);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  // Zustimmung aus localStorage laden (nur wenn Privacy-Zustimmung gegeben)
  useEffect(() => {
    const hasPrivacyConsent = localStorage.getItem('privacy-consent') === 'true';
    if (hasPrivacyConsent) {
      const savedConsent = localStorage.getItem('youtube-consent');
      if (savedConsent === 'true') {
        setConsentGiven(true);
      }
    }
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
    <section className="rounded-3xl border border-border/20 bg-card/50 backdrop-blur-sm shadow-xl shadow-black/5 dark:shadow-black/20 p-10 transition-all duration-200 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Neuestes YouTube-Video
          </p>
          <h3 className="text-3xl font-semibold text-card-foreground">
            {video.title}
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            {video.firstParagraph}
          </p>
          <a
            className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            href={video.watchUrl}
            target="_blank"
            rel="noreferrer"
          >
            Zum Kanal
          </a>
        </div>
        <div className="flex flex-col gap-4">
          {video.embedUrl && videoId ? (
            consentGiven ? (
              // YouTube Embed nach Zustimmung
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
              // Thumbnail mit Play-Button und Zustimmungsaufforderung
              <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg shadow-black/10 dark:shadow-black/30 cursor-pointer group" onClick={handleConsent}>
                {thumbnailUrl && (
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Fallback zu default thumbnail falls maxresdefault nicht verfügbar
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
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
            )
          ) : (
            // Fallback für fehlende Daten
            <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/10 dark:shadow-black/30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#f4f4f5,_transparent_60%)]" />
              <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                <span className="rounded-full border border-zinc-200 px-4 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400">
                  neuestes Video
                </span>
                <p className="text-lg font-semibold text-zinc-900">
                  neuestes Video
                </p>
                <p className="text-sm text-zinc-500">
                  Hier wird normalerweise das neueste YouTube-Video
                  angezeigt.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}