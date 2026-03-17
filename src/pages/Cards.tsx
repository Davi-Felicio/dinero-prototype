import { PageShell } from "@/components/PageShell";
import { ChevronLeft, CreditCard, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cards = [
  { name: "Nubank", type: "Crédito", lastDigits: "4523", brand: "Mastercard", limit: 12000, used: 3456.78, color: "from-purple-600/20 to-purple-900/20", dueDate: "27 Mar" },
  { name: "Inter", type: "Crédito", lastDigits: "8891", brand: "Visa", limit: 8000, used: 2134.50, color: "from-orange-600/20 to-orange-900/20", dueDate: "01 Abr" },
  { name: "Banco do Brasil", type: "Débito", lastDigits: "3312", brand: "Elo", limit: 0, used: 0, color: "from-yellow-600/20 to-yellow-900/20", dueDate: "" },
];

export default function Cards() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <p className="text-sm font-semibold text-foreground">Cartões</p>
        <button className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
          <Plus className="w-4 h-4 text-foreground" strokeWidth={1.5} />
        </button>
      </div>

      <div className="px-5 space-y-4">
        {cards.map((card) => (
          <div key={card.lastDigits} className={`rounded-2xl border border-border surface-1 p-5 bg-gradient-to-br ${card.color}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-sm font-medium text-foreground">{card.name}</span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{card.brand}</span>
            </div>

            <p className="text-xs text-muted-foreground mb-1 font-mono tracking-wider">
              •••• •••• •••• {card.lastDigits}
            </p>

            <div className="flex items-end justify-between mt-4">
              <div>
                <p className="text-[10px] text-muted-foreground">{card.type === "Crédito" ? "Fatura atual" : "Saldo"}</p>
                <p className="text-xl font-bold tabular-nums tracking-tighter-custom text-foreground">
                  R$ {card.used.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              {card.type === "Crédito" && (
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground">Limite</p>
                  <p className="text-xs tabular-nums text-muted-foreground">
                    R$ {card.limit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>

            {card.type === "Crédito" && (
              <>
                <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-brand"
                    style={{ width: `${(card.used / card.limit) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Vencimento: {card.dueDate}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
