import ContactForm from "../ContactForm";

export default function ContactSection() {
  return (
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
            href="mailto:kontakt@lifelinus.de"
            className="inline-block rounded-full border border-border/30 bg-background/50 backdrop-blur-sm shadow-md shadow-black/5 dark:shadow-black/20 px-6 py-3 text-sm font-medium text-card-foreground transition-all duration-200 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/30 hover:border-border"
          >
            kontakt@lifelinus.de
          </a>
        </div>
      </div>
    </section>
  );
}