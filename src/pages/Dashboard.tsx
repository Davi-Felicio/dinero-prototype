import { PageShell } from "@/components/PageShell";
import { TransactionItem } from "@/components/TransactionItem";
import { Eye, EyeOff, Bell, ChevronRight, ArrowUpRight, ArrowDownLeft, ShoppingCart, Home, Coffee, Zap, Car, CreditCard } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const recentTransactions = [
  { icon: ShoppingCart, name: "Supermercado Condor", category: "Alimentação", amount: 287.43, type: "expense" as const, date: "Hoje" },
  { icon: Zap, name: "Conta de Luz", category: "Moradia", amount: 189.90, type: "expense" as const, date: "Ontem" },
  { icon: Coffee, name: "Starbucks", category: "Lazer", amount: 32.50, type: "expense" as const, date: "Ontem" },
  { icon: ArrowDownLeft, name: "Salário", category: "Receita", amount: 8500.00, type: "income" as const, date: "15 Mar" },
  { icon: Car, name: "Uber", category: "Transporte", amount: 24.70, type: "expense" as const, date: "14 Mar" },
  { icon: Home, name: "Aluguel", category: "Moradia", amount: 1800.00, type: "expense" as const, date: "10 Mar" },
];

export default function Dashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const navigate = useNavigate();

  return (
    <PageShell>
      {/* Header */}
      <div className="px-5 pt-12 pb-2 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Boa noite,</p>
          <p className="text-base font-semibold text-foreground">Victor Blum</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
            <Bell className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-5 pt-4 pb-6">
        <div className="rounded-2xl border border-border surface-1 p-5 shadow-inset">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Saldo total</p>
            <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-muted-foreground">
              {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-4xl font-bold tabular-nums tracking-tighter-custom text-foreground mb-2">
            {balanceVisible ? "R$ 24.857,32" : "R$ ••••••"}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-success font-medium tabular-nums">
              +2,4% hoje
            </span>
          </div>
        </div>
      </div>

      {/* Flow Cards */}
      <div className="px-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border surface-1 p-4 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary rounded-r" />
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownLeft className="w-3.5 h-3.5 text-success" strokeWidth={2} />
            <span className="text-xs text-muted-foreground">Entradas</span>
          </div>
          <p className="text-lg font-semibold tabular-nums tracking-tighter-custom text-foreground">
            R$ 8.500,00
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">Este mês</p>
        </div>
        <div className="rounded-xl border border-border surface-1 p-4 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-destructive rounded-r" />
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpRight className="w-3.5 h-3.5 text-loss" strokeWidth={2} />
            <span className="text-xs text-muted-foreground">Saídas</span>
          </div>
          <p className="text-lg font-semibold tabular-nums tracking-tighter-custom text-foreground">
            R$ 3.642,68
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">Este mês</p>
        </div>
      </div>

      {/* Cards Carousel */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">Cartões</p>
          <button onClick={() => navigate("/cards")} className="text-xs text-muted-foreground flex items-center gap-0.5">
            Ver todos <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5">
          <div className="min-w-[220px] rounded-xl border border-border surface-2 p-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-primary" strokeWidth={1.5} />
              <span className="text-xs text-muted-foreground">Nubank</span>
            </div>
            <p className="text-xs text-muted-foreground">Fatura atual</p>
            <p className="text-base font-semibold tabular-nums tracking-tighter-custom text-foreground">R$ 1.234,56</p>
            <p className="text-[10px] text-muted-foreground mt-1">Vence em 10 dias</p>
          </div>
          <div className="min-w-[220px] rounded-xl border border-border surface-2 p-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-xs text-muted-foreground">Inter</span>
            </div>
            <p className="text-xs text-muted-foreground">Fatura atual</p>
            <p className="text-base font-semibold tabular-nums tracking-tighter-custom text-foreground">R$ 876,30</p>
            <p className="text-[10px] text-muted-foreground mt-1">Vence em 15 dias</p>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">Transações recentes</p>
          <button onClick={() => navigate("/transactions")} className="text-xs text-muted-foreground flex items-center gap-0.5">
            Ver todas <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-border">
          {recentTransactions.map((tx, i) => (
            <TransactionItem key={i} {...tx} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
