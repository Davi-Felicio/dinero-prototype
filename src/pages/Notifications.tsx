import { PageShell } from "@/components/PageShell";
import { ArrowLeft, AlertTriangle, TrendingUp, TrendingDown, CreditCard, Receipt, DollarSign, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: 1,
    type: "budget" as const,
    icon: AlertTriangle,
    title: "Limite de Alimentação próximo",
    description: "Você já usou 92% do orçamento de Alimentação este mês (R$ 1.380 de R$ 1.500).",
    time: "Agora",
    unread: true,
  },
  {
    id: 2,
    type: "asset_up" as const,
    icon: TrendingUp,
    title: "MXRF11 subiu +3,2%",
    description: "O fundo MXRF11 valorizou 3,2% hoje, cotação atual R$ 10,45.",
    time: "2h atrás",
    unread: true,
  },
  {
    id: 3,
    type: "bill" as const,
    icon: CreditCard,
    title: "Fatura Nubank vence em 3 dias",
    description: "Sua fatura de R$ 1.234,56 vence em 18/03. Não esqueça de pagar!",
    time: "5h atrás",
    unread: true,
  },
  {
    id: 4,
    type: "dividend" as const,
    icon: DollarSign,
    title: "Dividendo recebido — PETR4",
    description: "Você recebeu R$ 48,30 em dividendos de PETR4 (15 cotas).",
    time: "Ontem",
    unread: false,
  },
  {
    id: 5,
    type: "asset_down" as const,
    icon: TrendingDown,
    title: "IVVB11 caiu -2,1%",
    description: "O ETF IVVB11 desvalorizou 2,1% hoje, cotação atual R$ 284,50.",
    time: "Ontem",
    unread: false,
  },
  {
    id: 6,
    type: "budget" as const,
    icon: Percent,
    title: "Orçamento de Lazer estourado",
    description: "Você ultrapassou o limite de R$ 500 para Lazer. Total gasto: R$ 567,80.",
    time: "2 dias atrás",
    unread: false,
  },
  {
    id: 7,
    type: "bill" as const,
    icon: Receipt,
    title: "Conta de Luz vence amanhã",
    description: "Sua conta de luz de R$ 189,90 vence amanhã, 16/03.",
    time: "3 dias atrás",
    unread: false,
  },
];

const typeStyles: Record<string, { bg: string; text: string }> = {
  budget: { bg: "bg-amber-500/10", text: "text-amber-400" },
  asset_up: { bg: "bg-emerald-500/10", text: "text-success" },
  asset_down: { bg: "bg-red-500/10", text: "text-loss" },
  bill: { bg: "bg-blue-500/10", text: "text-blue-400" },
  dividend: { bg: "bg-emerald-500/10", text: "text-success" },
};

export default function Notifications() {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <PageShell>
      <div className="px-5 pt-12 pb-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full surface-2 border border-border flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Notificações</h1>
          </div>
          {unreadCount > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {unreadCount} novas
            </span>
          )}
        </div>

        {/* List */}
        <div className="space-y-2">
          {notifications.map((n) => {
            const style = typeStyles[n.type] || typeStyles.budget;
            return (
              <div
                key={n.id}
                className={`rounded-xl border p-4 flex gap-3 transition-brand ${
                  n.unread
                    ? "border-primary/20 surface-1"
                    : "border-border surface-2 opacity-70"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg ${style.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <n.icon className={`w-4 h-4 ${style.text}`} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    {n.unread && (
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.description}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1.5">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
