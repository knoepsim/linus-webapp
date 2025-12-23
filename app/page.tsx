import { fetchLatestVideo } from "./lib/youtube";
import { Instagram, Video, Headphones, Mail } from "lucide-react";
import ThemeToggle from "./components/ThemeToggle";
import ContactForm from "./components/ContactForm";

const fallbackVideo = {
  title: "Neuestes Video",
  firstParagraph:
    "Ein Fehler ist beim Laden aufgetreten.",
  embedUrl: "",
  watchUrl: "https://www.youtube.com/@lifelinus",
};

export default async function Home() {
  const latestVideo =
    (await fetchLatestVideo(process.env.YOUTUBE_CHANNEL_ID)) ?? fallbackVideo;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Lifelinus
            </p>
            <h1 className="text-2xl font-semibold text-foreground">Linus</h1>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a className="transition hover:text-foreground" href="#video">
              Neues Video
            </a>
            <a className="transition hover:text-foreground" href="#about">
              Über Linus
            </a>
            <a className="transition hover:text-foreground" href="#social">
              Social Media
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground flex items-center gap-2"
              href="#contact"
            >
              <Mail className="h-4 w-4" />
              Kontakt
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16">
        <section className="rounded-3xl border border-border bg-card p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Neuestes YouTube-Video
              </p>
              <h3 className="text-3xl font-semibold text-card-foreground">
                {latestVideo.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {latestVideo.firstParagraph}
              </p>
              <a
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                href={latestVideo.watchUrl}
                target="_blank"
                rel="noreferrer"
              >
                Zum Kanal
              </a>
            </div>
            <div className="flex flex-col gap-4">
              {latestVideo.embedUrl ? (
                <div className="relative h-64 overflow-hidden rounded-2xl bg-white shadow-sm">
                  <iframe
                    className="h-full w-full"
                    src={latestVideo.embedUrl}
                    title={latestVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
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

        <section id="about" className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div className="flex justify-center">
            <img
              src="/Linus.webp"
              alt="Linus"
              className="h-80 rounded-3xl object-cover shadow-lg"
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Über Linus
            </p>
            <h3 className="text-3xl font-semibold text-card-foreground">
              Präsent, empathisch, neugierig.
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Linus ist der Gastgeber, der Menschen zusammenbringt. Mit viel Empathie und Neugier führt er Gespräche, in denen jeder sich öffnen kann. Es geht um echte Begegnungen, nicht um Perfektion.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-card-foreground">Mission:</p>
              <p className="text-sm text-muted-foreground">Echte Lebensgeschichten sichtbar machen.</p>
              <p className="text-sm font-medium text-card-foreground">Stil:</p>
              <p className="text-sm text-muted-foreground">Ruhige Atmosphäre, klare Fragen, warme Gespräche.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8" id="social">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Social Media
            </p>
            <h3 className="text-3xl font-semibold text-card-foreground">
              Tägliche Einblicke &amp; Community.
            </h3>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Die Gespräche gehen weiter: Auf Social Media teile ich kurze Updates, Einblicke hinter die Kulissen sowie in mein Leben und beantworte Fragen aus der Community. Schau vorbei!
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Instagram",
                text: "Portraits, Zitate und Highlights aus den Gesprächen.",
                link: "#", // Placeholder
                icon: <Instagram className="h-6 w-6" />,
              },
              {
                title: "TikTok",
                text: "Kurze Clips und schnelle Einblicke aus dem Format.",
                link: "#", // Placeholder
                icon: <Video className="h-6 w-6" />,
              },
              {
                title: "Podcast",
                text: "Die vollen Gespräche zum Anhören unterwegs.",
                link: "#", // Placeholder
                icon: <Headphones className="h-6 w-6" />,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {item.icon}
                    <p className="text-lg font-semibold text-card-foreground">
                      {item.title}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </div>
                <a
                  href={item.link}
                  className="text-left text-sm font-medium text-card-foreground hover:text-card-foreground/70"
                >
                  Folgen →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Kontakt
            </p>
            <h3 className="text-3xl font-semibold text-card-foreground">
              Schreib mir eine Nachricht
            </h3>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Hast du Fragen, Ideen oder möchtest du ein Interview vorschlagen? Ich freue mich auf deine Nachricht.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <ContactForm />
            <div className="space-y-4">
              <p className="text-lg font-semibold text-card-foreground">Direkter Kontakt</p>
              <p className="text-base text-muted-foreground">
                Oder schreib mir direkt eine Email an:
              </p>
              <a
                href="mailto:hello@lifelinus.de"
                className="inline-block rounded-full border border-border px-6 py-3 text-sm font-medium text-card-foreground transition hover:border-card-foreground"
              >
                hello@lifelinus.de
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2025 Lifelinus. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a className="transition hover:text-foreground" href="mailto:hello@lifelinus.de">
              hello@lifelinus.de
            </a>
            <a className="transition hover:text-foreground" href="#social">
              Social Links
            </a>
            <a className="transition hover:text-foreground" href="/impressum">
              Impressum
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
