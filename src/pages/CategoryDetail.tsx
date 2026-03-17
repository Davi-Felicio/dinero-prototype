import { PageShell } from "@/components/PageShell";
import { TransactionItem } from "@/components/TransactionItem";
import { ChevronLeft, Search, ShoppingCart, Home, Coffee, Zap, Car, ArrowDownLeft, Wifi, GraduationCap, Dumbbell } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const allTransactions = [
  { icon: ShoppingCart, name: "Supermercado Condor", category: "Alimentação", amount: 287.43, type: "expense" as const, date: "17 Mar" },
  { icon: Zap, name: "Conta de Luz", category: "Moradia", amount: 189.90, type: "expense" as const, date: "16 Mar" },
  { icon: Coffee, name: "Starbucks", category: "Lazer", amount: 32.50, type: "expense" as const, date: "16 Mar" },
  { icon: ArrowDownLeft, name: "Salário", category: "Receita", amount: 8500.00, type: "income" as const, date: "15 Mar" },
  { icon: Car, name: "Uber", category: "Transporte", amount: 24.70, type: "expense" as const, date: "14 Mar" },
  { icon: Home, name: "Aluguel", category: "Moradia", amount: 1800.00, type: "expense" as const, date: "10 Mar" },
  { icon: Wifi, name: "Internet", category: "Assinaturas", amount: 119.90, type: "expense" as const, date: "5 Mar" },
  { icon: ShoppingCart, name: "Atacadão", category: "Alimentação", amount: 412.30, type: "expense" as const, date: "28 Fev" },
  { icon: Dumbbell, name: "Academia", category: "Saúde", amount: 89.90, type: "expense" as const, date: "25 Fev" },
  { icon: ArrowDownLeft, name: "Salário", category: "Receita", amount: 8500.00, type: "income" as const, date: "15 Fev" },
  { icon: GraduationCap, name: "Curso Udemy", category: "Educação", amount: 49.90, type: "expense" as const, date: "10 Fev" },
  { icon: Home, name: "Aluguel", category: "Moradia", amount: 1800.00, type: "expense" as const, date: "10 Fev" },
  { icon: ArrowDownLeft, name: "Salário", category: "Receita", amount: 8500.00, type: "income" as const, date: "15 Jan" },
  { icon: ShoppingCart, name: "Supermercado", category: "Alimentação", amount: 356.80, type: "expense" as const, date: "12 Jan" },
  { icon: Home, name: "Aluguel", category: "Moradia", amount: 1800.00, type: "expense" as const, date: "10 Jan" },
];

const categoryEmojis: Record<string, string> = {
  "Moradia": "🏠",
  "Alimentação": "🍔",
  "Transporte": "🚗",
  "Lazer": "🎮",
  "Assinaturas": "📱",
  "Saúde": "💊",
  "Educação": "📚",
  "Receita": "💰",
};

export default function CategoryDetail() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const categoryName = decodeURIComponent(name || "");
  const emoji = categoryEmojis[categoryName] || "📁";

  const filtered = allTransactions.filter((tx) => tx.category === categoryName);
  const total = filtered.reduce((sum, tx) => sum + (tx.type === "expense" ? -tx.amount : tx.amount), 0);

  return (
    <PageShell>
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-base">{emoji}</span>
          <p className="text-sm font-semibold text-foreground">{categoryName}</p>
        </div>
        <div className="w-9" />
      </div>

      {/* Summary */}
      <div className="px-5 mb-4">
        <div className="rounded-xl border border-border surface-1 p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total na categoria</p>
          <p className={`text-2xl font-bold tabular-nums tracking-tighter-custom ${total < 0 ? "text-loss" : "text-success"}`}>
            {total < 0 ? "-" : "+"}R$ {Math.abs(total).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">{filtered.length} transações</p>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Buscar transação..."
            className="w-full py-2.5 pl-10 pr-4 rounded-xl surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Transaction List */}
      <div className="px-5">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Nenhuma transação nesta categoria</p>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((tx, i) => (
              <TransactionItem key={i} {...tx} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
