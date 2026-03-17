import { PageShell } from "@/components/PageShell";
import { ChevronLeft, DollarSign, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const currencies = [
  { from: "USD", to: "BRL", rate: 5.12, change: -0.3, flag: "🇺🇸" },
  { from: "EUR", to: "BRL", rate: 5.56, change: 0.2, flag: "🇪🇺" },
  { from: "GBP", to: "BRL", rate: 6.48, change: -0.1, flag: "🇬🇧" },
  { from: "ARS", to: "BRL", rate: 0.0058, change: -1.2, flag: "🇦🇷" },
  { from: "BTC", to: "BRL", rate: 512340.00, change: 3.4, flag: "₿" },
  { from: "ETH", to: "BRL", rate: 18920.00, change: 2.1, flag: "Ξ" },
];

export default function Currencies() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <p className="text-sm font-semibold text-foreground">Cotações</p>
        <button className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
          <RefreshCw className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
        </button>
      </div>

      <div className="px-5">
        <p className="text-[10px] text-muted-foreground mb-4">
          Atualizado há 12 min · AwesomeAPI
        </p>

        <div className="space-y-3">
          {currencies.map((cur) => {
            const isPositive = cur.change >= 0;
            return (
              <div key={cur.from} className="rounded-xl border border-border surface-1 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full surface-2 border border-border flex items-center justify-center text-lg">
                  {cur.flag}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{cur.from}/BRL</p>
                  <p className="text-xs text-muted-foreground">1 {cur.from} = R$ {cur.rate.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-loss" />
                  )}
                  <span className={`text-xs font-medium tabular-nums ${isPositive ? "text-success" : "text-loss"}`}>
                    {isPositive ? "+" : ""}{cur.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
