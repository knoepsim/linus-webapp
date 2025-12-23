import { cn } from "../../lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-6 bg-gradient-to-r from-transparent via-background/20 to-transparent backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
