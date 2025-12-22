export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-100">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
              Lifelinus
            </p>
            <h1 className="text-2xl font-semibold text-zinc-900">Linus</h1>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-zinc-500 md:flex">
            <a className="transition hover:text-zinc-900" href="#story">
              Story
            </a>
            <a className="transition hover:text-zinc-900" href="#video">
              Neues Video
            </a>
            <a className="transition hover:text-zinc-900" href="#social">
              Social Media
            </a>
          </nav>
          <a
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:border-zinc-900"
            href="mailto:hello@lifelinus.de"
          >
            Kontakt
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16">
        <section className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
              Menschen. Mut. Begegnung.
            </p>
            <h2 className="text-4xl font-semibold leading-tight text-zinc-900 md:text-5xl">
              Geschichten, die zeigen, wie viel Leben in jedem Tag steckt.
            </h2>
            <p className="text-lg leading-relaxed text-zinc-600">
              Lifelinus ist eine Plattform für authentische Begegnungen. In
              Interviews entsteht ein Raum für Offenheit, Humor und ehrliche
              Einblicke in besondere Lebensrealitäten.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                href="#video"
              >
                Zum neuesten Interview
              </a>
              <a
                className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-900 transition hover:border-zinc-900"
                href="#social"
              >
                Social Kanäle entdecken
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-8">
            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
                Format
              </p>
              <h3 className="text-2xl font-semibold text-zinc-900">
                Heute treffe ich...
              </h3>
              <p className="text-base leading-relaxed text-zinc-600">
                Eine Interviewreihe über Menschen, die inspirieren. Gemeinsam
                sprechen wir über Alltag, Herausforderungen und die Dinge, die
                wirklich bewegen.
              </p>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li>• Persönliche Geschichten statt schneller Clips</li>
                <li>• Ruhiger Look, klare Fragen, echte Antworten</li>
                <li>• Fokus auf Empowerment und Community</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="story" className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
              Über Linus
            </p>
            <h3 className="text-3xl font-semibold text-zinc-900">
              Präsent, empathisch, neugierig.
            </h3>
            <p className="text-base leading-relaxed text-zinc-600">
              Linus verbindet Menschen, die besondere Perspektiven teilen. Mit
              viel Feingefühl führt er Gespräche, in denen Gäste sich zeigen
              können und Zuschauer:innen sich wiederfinden.
            </p>
          </div>
          <div className="grid gap-6 rounded-3xl border border-zinc-100 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                Mission
              </p>
              <p className="mt-2 text-lg font-medium text-zinc-900">
                Mehr Sichtbarkeit für echte Lebensgeschichten.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                Stil
              </p>
              <p className="mt-2 text-lg font-medium text-zinc-900">
                Ruhige Bildsprache, klare Struktur, warme Gespräche.
              </p>
            </div>
          </div>
        </section>

        <section id="video" className="rounded-3xl border border-zinc-100 bg-zinc-50 p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
                Neuestes YouTube-Video
              </p>
              <h3 className="text-3xl font-semibold text-zinc-900">
                Heute treffe ich Acacio.
              </h3>
              <p className="text-base leading-relaxed text-zinc-600">
                Acacio lebt mit einer Muskelerkrankung und nutzt einen
                E-Rollstuhl. Er spricht offen über seinen Alltag, seine
                Geschichte und die Rolle des E-Rollstuhl-Fußballs in seinem
                Leben.
              </p>
              <div className="space-y-2 text-sm text-zinc-500">
                <p>• Länge: 24 Minuten</p>
                <p>• Thema: Alltag, Selbstbestimmung, Sport</p>
                <p>• Veröffentlichung: jeden Monat ein neues Interview</p>
              </div>
              <a
                className="inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                href="https://www.youtube.com/@lifelinus"
                target="_blank"
                rel="noreferrer"
              >
                Zum Kanal
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#f4f4f5,_transparent_60%)]" />
                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  <span className="rounded-full border border-zinc-200 px-4 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400">
                    Vorschau
                  </span>
                  <p className="text-lg font-semibold text-zinc-900">
                    Interview-Teaser
                  </p>
                  <p className="text-sm text-zinc-500">
                    Hier kann das aktuelle Video eingebettet werden.
                  </p>
                </div>
              </div>
              <p className="text-xs text-zinc-400">
                Du hast ein Video oder Foto? Teile es mir und ich binde es hier
                ein.
              </p>
            </div>
          </div>
        </section>

        <section id="social" className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
              Social Media
            </p>
            <h3 className="text-3xl font-semibold text-zinc-900">
              Tägliche Einblicke &amp; Community.
            </h3>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
              Die Gespräche gehen weiter: kurze Updates, Behind-the-Scenes und
              Fragen aus der Community findest du auf den Social Kanälen.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Instagram",
                text: "Portraits, Zitate & Highlights aus den Interviews.",
              },
              {
                title: "TikTok",
                text: "Kurze Ausschnitte und schnelle Fragen aus dem Format.",
              },
              {
                title: "Podcast",
                text: "Langform-Audio für unterwegs und tiefere Gespräche.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-100 bg-white p-6"
              >
                <div>
                  <p className="text-lg font-semibold text-zinc-900">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">{item.text}</p>
                </div>
                <button className="text-left text-sm font-medium text-zinc-900">
                  Link ergänzen →
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-100">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© 2024 Lifelinus. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a className="transition hover:text-zinc-900" href="mailto:hello@lifelinus.de">
              hello@lifelinus.de
            </a>
            <a className="transition hover:text-zinc-900" href="#social">
              Social Links
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
