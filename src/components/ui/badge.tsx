import { cn, statutLabel, statutColor } from "@/lib/utils";

interface BadgeProps {
  statut: string;
  className?: string;
}

export function Badge({ statut, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        statutColor(statut),
        className
      )}
    >
      {statutLabel(statut)}
    </span>
  );
}
