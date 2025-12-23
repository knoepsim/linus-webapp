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
          {video.embedUrl ? (
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