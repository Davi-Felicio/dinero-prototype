import { PageShell } from "@/components/PageShell";
import { StatCard } from "@/components/StatCard";
import { ChevronLeft, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useState } from "react";

const assetData: Record<string, {
  ticker: string; name: string; price: number; change: number; type: string;
  stats: { label: string; value: string; subtitle?: string }[];
  chartData: { date: string; price: number }[];
}> = {
  MXRF11: {
    ticker: "MXRF11", name: "Maxi Renda FII", price: 10.23, change: 1.2, type: "FII",
    stats: [
      { label: "P/VP", value: "0.98", subtitle: "Abaixo do VP" },
      { label: "DY (12m)", value: "13.2%", subtitle: "R$ 1.35/cota" },
      { label: "Liquidez Diária", value: "R$ 12.4M" },
      { label: "Preço Médio", value: "R$ 9.87", subtitle: "Seu custo" },
    ],
    chartData: [
      { date: "Set", price: 9.80 }, { date: "Out", price: 9.95 }, { date: "Nov", price: 10.05 },
      { date: "Dez", price: 9.90 }, { date: "Jan", price: 10.10 }, { date: "Fev", price: 10.15 },
      { date: "Mar", price: 10.23 },
    ],
  },
  HGLG11: {
    ticker: "HGLG11", name: "CSHG Logística FII", price: 164.50, change: -0.8, type: "FII",
    stats: [
      { label: "P/VP", value: "1.05" },
      { label: "DY (12m)", value: "8.7%", subtitle: "R$ 14.31/cota" },
      { label: "Liquidez Diária", value: "R$ 8.2M" },
      { label: "Preço Médio", value: "R$ 158.30", subtitle: "Seu custo" },
    ],
    chartData: [
      { date: "Set", price: 158 }, { date: "Out", price: 160 }, { date: "Nov", price: 163 },
      { date: "Dez", price: 165 }, { date: "Jan", price: 166 }, { date: "Fev", price: 165.5 },
      { date: "Mar", price: 164.50 },
    ],
  },
};

const defaultAsset = assetData.MXRF11;

const periods = ["1D", "1S", "1M", "3M", "1A", "Tudo"];

export default function AssetDetail() {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const asset = assetData[ticker || ""] || defaultAsset;
  const [activePeriod, setActivePeriod] = useState("1A");
  const isPositive = asset.change >= 0;

  return (
    <PageShell>
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="text-center">
          <p className="text-sm font-bold text-foreground">{asset.ticker}</p>
          <p className="text-[10px] text-muted-foreground">{asset.type}</p>
        </div>
        <button className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
          <Star className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
        </button>
      </div>

      {/* Price */}
      <div className="px-5 text-center pb-2">
        <p className="text-3xl font-bold tabular-nums tracking-tighter-custom text-foreground">
          R$ {asset.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
        <span className={`text-xs px-1.5 py-0.5 rounded font-medium tabular-nums ${
          isPositive ? "bg-primary/10 text-success" : "bg-destructive/10 text-loss"
        }`}>
          {isPositive ? "+" : ""}{asset.change.toFixed(2)}% hoje
        </span>
      </div>

      {/* Chart */}
      <div className="px-3 mt-2">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={asset.chartData}>
              <defs>
                <linearGradient id="assetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isPositive ? "hsl(145, 40%, 48%)" : "hsl(0, 72%, 51%)"} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={isPositive ? "hsl(145, 40%, 48%)" : "hsl(0, 72%, 51%)"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(240, 5%, 55%)' }} />
              <YAxis hide domain={['dataMin - 0.5', 'dataMax + 0.5']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(240, 6%, 6%)',
                  border: '1px solid hsl(240, 4%, 14%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'hsl(0, 0%, 98%)',
                }}
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Preço']}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "hsl(145, 40%, 48%)" : "hsl(0, 72%, 51%)"}
                strokeWidth={2}
                fill="url(#assetGradient)"
              />
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
                activePeriod === p ? "bg-accent text-foreground" : "text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-5 mt-5">
        <p className="text-sm font-semibold text-foreground mb-3">Indicadores</p>
        <div className="grid grid-cols-2 gap-3">
          {asset.stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* About */}
      <div className="px-5 mt-5 mb-24">
        <p className="text-sm font-semibold text-foreground mb-2">Sobre</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {asset.name} é um fundo de investimento imobiliário focado em recebíveis imobiliários, com distribuição mensal de dividendos.
        </p>
      </div>

      {/* CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-5 pb-2">
        <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 transition-brand active:scale-[0.98]">
          Adicionar à Carteira
        </button>
      </div>
    </PageShell>
  );
}
