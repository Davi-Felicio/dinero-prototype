interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
}

export function StatCard({ label, value, subtitle }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border surface-2 p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-base font-semibold tabular-nums tracking-tighter-custom text-foreground">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  );
}
