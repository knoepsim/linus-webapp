import { cn } from "../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/20 bg-card/50 backdrop-blur-sm shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-200 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30",
        className
      )}
    >
      {children}
    </div>
  );
}
