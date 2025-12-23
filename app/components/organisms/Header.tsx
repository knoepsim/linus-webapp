import { Mail } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  return (
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
          <a
            className="rounded-full border border-border/30 bg-background/50 backdrop-blur-sm shadow-md shadow-black/5 dark:shadow-black/20 px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/30 hover:border-border flex items-center gap-2"
            href="#contact"
          >
            <Mail className="h-4 w-4" />
            Kontakt
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}