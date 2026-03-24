import { PageShell } from "@/components/PageShell";
import { AssetRow } from "@/components/AssetRow";
import { ChevronLeft, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const portfolioData = [
  { month: "Set", value: 18000 },
  { month: "Out", value: 19200 },
  { month: "Nov", value: 18800 },
  { month: "Dez", value: 21000 },
  { month: "Jan", value: 22400 },
  { month: "Fev", value: 21800 },
  { month: "Mar", value: 24857 },
];

const periods = ["1D", "1S", "1M", "3M", "1A", "Tudo"];

const assets = [
  { ticker: "MXRF11", name: "Maxi Renda", quantity: 150, price: 10.23, change: 1.2, sparkData: [10, 10.1, 10.05, 10.15, 10.2, 10.18, 10.23] },
  { ticker: "HGLG11", name: "CSHG Logística", quantity: 20, price: 164.50, change: -0.8, sparkData: [166, 165.5, 165, 164.8, 164.2, 164.6, 164.5] },
  { ticker: "AAPL34", name: "Apple BDR", quantity: 30, price: 52.80, change: 2.1, sparkData: [50, 50.5, 51, 51.8, 52.2, 52.5, 52.8] },
  { ticker: "PETR4", name: "Petrobras PN", quantity: 100, price: 38.42, change: -1.5, sparkData: [40, 39.5, 39, 38.8, 38.5, 38.6, 38.42] },
  { ticker: "IVVB11", name: "iShares S&P 500", quantity: 45, price: 318.90, change: 0.7, sparkData: [315, 316, 317, 316.5, 318, 318.5, 318.9] },
  { ticker: "VALE3", name: "Vale ON", quantity: 80, price: 62.15, change: -2.3, sparkData: [65, 64, 63.5, 63, 62.8, 62.5, 62.15] },
];

export default function Portfolio() {
  const [activePeriod, setActivePeriod] = useState("1A");
  const navigate = useNavigate();

  return (
    <PageShell>
      <div className="px-5 pt-12 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">Portfólio</h1>
          <button className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
            <Search className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="px-5 pt-2">
        <p className="text-xs text-muted-foreground">Valor total investido</p>
        <p className="text-3xl font-bold tabular-nums tracking-tighter-custom text-foreground">R$ 24.857,32</p>
        <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-success font-medium tabular-nums">
          +R$ 3.241,80 (+14,98%)
        </span>
      </div>

      {/* Chart */}
      <div className="px-5 mt-4">
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(145, 40%, 48%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(145, 40%, 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(240, 5%, 55%)' }} />
              <YAxis hide domain={['dataMin - 1000', 'dataMax + 500']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(240, 6%, 6%)',
                  border: '1px solid hsl(240, 4%, 14%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'hsl(0, 0%, 98%)',
                }}
                formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
              />
              <Area type="monotone" dataKey="value" stroke="hsl(145, 40%, 48%)" strokeWidth={2} fill="url(#portfolioGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Period Selector */}
      <div className="px-5 mt-2">
        <div className="flex items-center gap-1 p-1 rounded-lg surface-2 border border-border">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-brand ${
                activePeriod === p
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <div className="px-5 mt-4">
        <button
          onClick={() => navigate("/assets")}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-brand active:scale-[0.98] hover:brightness-110"
        >
          <Search className="w-4 h-4" />
          Pesquisar ativos
        </button>
      </div>

      {/* Asset List */}
      <div className="px-5 mt-5 mb-24">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">Ativos ({assets.length})</p>
        </div>
        <div className="divide-y divide-border">
          {assets.map((asset) => (
            <AssetRow
              key={asset.ticker}
              {...asset}
              onClick={() => navigate(`/asset/${asset.ticker}`)}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
