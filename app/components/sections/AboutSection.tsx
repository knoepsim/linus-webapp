import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
      <div className="flex justify-center">
        <Image
          src="/linus.png"
          alt="Linus"
          width={320}
          height={320}
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
  );
}