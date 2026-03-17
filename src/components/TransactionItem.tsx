import { LucideIcon } from "lucide-react";

interface TransactionItemProps {
  icon: LucideIcon;
  name: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date?: string;
}

export function TransactionItem({ icon: Icon, name, category, amount, type, date }: TransactionItemProps) {
  const isExpense = type === "expense";

  return (
    <div className="flex items-center gap-3 py-3 px-1 transition-brand group">
      <div className="w-10 h-10 rounded-xl surface-2 flex items-center justify-center border border-border">
        <Icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{category}{date ? ` · ${date}` : ""}</p>
      </div>
      <span className={`text-sm font-medium tabular-nums tracking-tighter-custom ${isExpense ? "text-loss" : "text-success"}`}>
        {isExpense ? "-" : "+"}R$ {Math.abs(amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}
