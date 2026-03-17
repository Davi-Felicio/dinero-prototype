import { PageShell } from "@/components/PageShell";
import { TransactionItem } from "@/components/TransactionItem";
import { Search, SlidersHorizontal, ShoppingCart, Home, Coffee, Zap, Car, ArrowDownLeft, Wifi, GraduationCap, Dumbbell } from "lucide-react";
import { useState } from "react";

const months = ["Mar 2026", "Fev 2026", "Jan 2026"];

const transactionsByMonth: Record<string, { icon: any; name: string; category: string; amount: number; type: "income" | "expense"; date: string }[]> = {
  "Mar 2026": [
    { icon: ShoppingCart, name: "Supermercado Condor", category: "Alimentação", amount: 287.43, type: "expense", date: "17 Mar" },
    { icon: Zap, name: "Conta de Luz", category: "Moradia", amount: 189.90, type: "expense", date: "16 Mar" },
    { icon: Coffee, name: "Starbucks", category: "Lazer", amount: 32.50, type: "expense", date: "16 Mar" },
    { icon: ArrowDownLeft, name: "Salário", category: "Receita", amount: 8500.00, type: "income", date: "15 Mar" },
    { icon: Car, name: "Uber", category: "Transporte", amount: 24.70, type: "expense", date: "14 Mar" },
    { icon: Home, name: "Aluguel", category: "Moradia", amount: 1800.00, type: "expense", date: "10 Mar" },
    { icon: Wifi, name: "Internet", category: "Assinaturas", amount: 119.90, type: "expense", date: "5 Mar" },
  ],
  "Fev 2026": [
    { icon: ShoppingCart, name: "Atacadão", category: "Alimentação", amount: 412.30, type: "expense", date: "28 Fev" },
    { icon: Dumbbell, name: "Academia", category: "Saúde", amount: 89.90, type: "expense", date: "25 Fev" },
    { icon: ArrowDownLeft, name: "Salário", category: "Receita", amount: 8500.00, type: "income", date: "15 Fev" },
    { icon: GraduationCap, name: "Curso Udemy", category: "Educação", amount: 49.90, type: "expense", date: "10 Fev" },
    { icon: Home, name: "Aluguel", category: "Moradia", amount: 1800.00, type: "expense", date: "10 Fev" },
  ],
  "Jan 2026": [
    { icon: ArrowDownLeft, name: "Salário", category: "Receita", amount: 8500.00, type: "income", date: "15 Jan" },
    { icon: ShoppingCart, name: "Supermercado", category: "Alimentação", amount: 356.80, type: "expense", date: "12 Jan" },
    { icon: Home, name: "Aluguel", category: "Moradia", amount: 1800.00, type: "expense", date: "10 Jan" },
  ],
};

const filterCategories = ["Todas", "Alimentação", "Moradia", "Transporte", "Lazer", "Saúde"];

export default function Transactions() {
  const [activeFilter, setActiveFilter] = useState("Todas");

  return (
    <PageShell>
      <div className="px-5 pt-12 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-foreground">Transações</h1>
          <button className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Buscar transação..."
            className="w-full py-2.5 pl-10 pr-4 rounded-xl surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 mb-4">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-brand border ${
                activeFilter === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border surface-2 text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List by Month */}
      {months.map((month) => (
        <div key={month} className="px-5 mb-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{month}</p>
          <div className="divide-y divide-border">
            {(transactionsByMonth[month] || [])
              .filter((tx) => activeFilter === "Todas" || tx.category === activeFilter)
              .map((tx, i) => (
                <TransactionItem key={i} {...tx} />
              ))}
          </div>
        </div>
      ))}
    </PageShell>
  );
}
