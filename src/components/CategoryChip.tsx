interface CategoryChipProps {
  emoji: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryChip({ emoji, label, isActive, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-medium whitespace-nowrap transition-brand ${
        isActive
          ? "border-primary bg-primary/10 text-primary"
          : "border-border surface-2 text-muted-foreground"
      }`}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
