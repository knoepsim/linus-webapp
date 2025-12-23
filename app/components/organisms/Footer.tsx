export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© 2025 Lifelinus. Alle Rechte vorbehalten.</p>
        <div className="flex gap-6">
          <a className="transition hover:text-foreground" href="mailto:kontakt@lifelinus.de">
            kontakt@lifelinus.de
          </a>
          <a className="transition hover:text-foreground" href="https://www.ng-influence.de/impressum">
            Impressum
          </a>
        </div>
      </div>
    </footer>
  );
}