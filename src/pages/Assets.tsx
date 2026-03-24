import { PageShell } from "@/components/PageShell";
import { ChevronLeft, Search, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const assetTypes = ["Todos", "Ações", "FIIs", "BDRs", "ETFs", "Cripto"];

interface AssetInfo {
  ticker: string;
  name: string;
  type: string;
  price: number;
  change: number;
  chartData: { d: string; p: number }[];
}

const allAssets: AssetInfo[] = [
  {
    ticker: "PETR4", name: "Petrobras PN", type: "Ações", price: 38.42, change: -1.5,
    chartData: [
      { d: "Out", p: 40.1 }, { d: "Nov", p: 39.5 }, { d: "Dez", p: 39.0 },
      { d: "Jan", p: 38.8 }, { d: "Fev", p: 38.6 }, { d: "Mar", p: 38.42 },
    ],
  },
  {
    ticker: "VALE3", name: "Vale ON", type: "Ações", price: 62.15, change: -2.3,
    chartData: [
      { d: "Out", p: 65.0 }, { d: "Nov", p: 64.0 }, { d: "Dez", p: 63.5 },
      { d: "Jan", p: 63.0 }, { d: "Fev", p: 62.5 }, { d: "Mar", p: 62.15 },
    ],
  },
  {
    ticker: "ITUB4", name: "Itaú Unibanco PN", type: "Ações", price: 34.78, change: 1.8,
    chartData: [
      { d: "Out", p: 32.0 }, { d: "Nov", p: 32.8 }, { d: "Dez", p: 33.5 },
      { d: "Jan", p: 33.9 }, { d: "Fev", p: 34.2 }, { d: "Mar", p: 34.78 },
    ],
  },
  {
    ticker: "WEGE3", name: "WEG ON", type: "Ações", price: 42.30, change: 3.2,
    chartData: [
      { d: "Out", p: 38.0 }, { d: "Nov", p: 39.2 }, { d: "Dez", p: 40.1 },
      { d: "Jan", p: 40.8 }, { d: "Fev", p: 41.5 }, { d: "Mar", p: 42.30 },
    ],
  },
  {
    ticker: "MXRF11", name: "Maxi Renda FII", type: "FIIs", price: 10.23, change: 1.2,
    chartData: [
      { d: "Out", p: 9.95 }, { d: "Nov", p: 10.05 }, { d: "Dez", p: 9.90 },
      { d: "Jan", p: 10.10 }, { d: "Fev", p: 10.15 }, { d: "Mar", p: 10.23 },
    ],
  },
  {
    ticker: "HGLG11", name: "CSHG Logística FII", type: "FIIs", price: 164.50, change: -0.8,
    chartData: [
      { d: "Out", p: 160.0 }, { d: "Nov", p: 163.0 }, { d: "Dez", p: 165.0 },
      { d: "Jan", p: 166.0 }, { d: "Fev", p: 165.5 }, { d: "Mar", p: 164.50 },
    ],
  },
  {
    ticker: "XPML11", name: "XP Malls FII", type: "FIIs", price: 98.70, change: 0.5,
    chartData: [
      { d: "Out", p: 96.0 }, { d: "Nov", p: 97.0 }, { d: "Dez", p: 97.5 },
      { d: "Jan", p: 98.0 }, { d: "Fev", p: 98.3 }, { d: "Mar", p: 98.70 },
    ],
  },
  {
    ticker: "AAPL34", name: "Apple BDR", type: "BDRs", price: 52.80, change: 2.1,
    chartData: [
      { d: "Out", p: 48.0 }, { d: "Nov", p: 49.5 }, { d: "Dez", p: 50.2 },
      { d: "Jan", p: 51.0 }, { d: "Fev", p: 52.0 }, { d: "Mar", p: 52.80 },
    ],
  },
  {
    ticker: "MSFT34", name: "Microsoft BDR", type: "BDRs", price: 68.45, change: 1.4,
    chartData: [
      { d: "Out", p: 64.0 }, { d: "Nov", p: 65.0 }, { d: "Dez", p: 66.2 },
      { d: "Jan", p: 67.0 }, { d: "Fev", p: 67.8 }, { d: "Mar", p: 68.45 },
    ],
  },
  {
    ticker: "IVVB11", name: "iShares S&P 500", type: "ETFs", price: 318.90, change: 0.7,
    chartData: [
      { d: "Out", p: 310.0 }, { d: "Nov", p: 312.0 }, { d: "Dez", p: 314.0 },
      { d: "Jan", p: 316.0 }, { d: "Fev", p: 317.5 }, { d: "Mar", p: 318.90 },
    ],
  },
  {
    ticker: "BOVA11", name: "iShares Ibovespa", type: "ETFs", price: 118.30, change: -0.4,
    chartData: [
      { d: "Out", p: 120.0 }, { d: "Nov", p: 119.5 }, { d: "Dez", p: 119.0 },
      { d: "Jan", p: 118.8 }, { d: "Fev", p: 118.5 }, { d: "Mar", p: 118.30 },
    ],
  },
  {
    ticker: "BTC", name: "Bitcoin", type: "Cripto", price: 350420.00, change: 5.8,
    chartData: [
      { d: "Out", p: 290000 }, { d: "Nov", p: 310000 }, { d: "Dez", p: 325000 },
      { d: "Jan", p: 335000 }, { d: "Fev", p: 342000 }, { d: "Mar", p: 350420 },
    ],
  },
  {
    ticker: "ETH", name: "Ethereum", type: "Cripto", price: 18350.00, change: 3.2,
    chartData: [
      { d: "Out", p: 15000 }, { d: "Nov", p: 16000 }, { d: "Dez", p: 16800 },
      { d: "Jan", p: 17200 }, { d: "Fev", p: 17800 }, { d: "Mar", p: 18350 },
    ],
  },
];

function AssetCard({ asset, onClick }: { asset: AssetInfo; onClick: () => void }) {
  const isPositive = asset.change >= 0;

  return (
    <button onClick={onClick} className="w-full rounded-xl border border-border surface-1 p-4 text-left transition-brand hover:bg-accent/30 active:scale-[0.98]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-bold text-foreground">{asset.ticker}</p>
          <p className="text-[11px] text-muted-foreground">{asset.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold tabular-nums tracking-tighter-custom text-foreground">
            R$ {asset.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
          <div className={`flex items-center justify-end gap-0.5 ${isPositive ? "text-success" : "text-loss"}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="text-xs tabular-nums font-medium">
              {isPositive ? "+" : ""}{asset.change.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={asset.chartData}>
            <defs>
              <linearGradient id={`grad-${asset.ticker}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} stopOpacity={0.2} />
                <stop offset="100%" stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={["dataMin", "dataMax"]} />
            <Area
              type="monotone"
              dataKey="p"
              stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
              strokeWidth={1.5}
              fill={`url(#grad-${asset.ticker})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1">
        <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-accent/60">{asset.type}</span>
      </div>
    </button>
  );
}

export default function Assets() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("Todos");

  const filtered = allAssets.filter((a) => {
    const matchType = activeType === "Todos" || a.type === activeType;
    const matchSearch = search === "" ||
      a.ticker.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <PageShell>
      {/* Header */}
      <div className="px-5 pt-12 pb-2">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Ativos</h1>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 mt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por ticker ou nome..."
            className="w-full py-2.5 pl-10 pr-4 rounded-xl surface-2 border border-border text-sm text-foreground bg-transparent placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Type Filter */}
      <div className="px-5 mt-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
          {assetTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-brand border ${
                activeType === type
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "surface-2 text-muted-foreground border-border"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-5 mt-4 mb-24">
        <p className="text-xs text-muted-foreground mb-3">
          {filtered.length} ativo{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Nenhum ativo encontrado</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Tente buscar por outro ticker ou nome</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((asset) => (
              <AssetCard
                key={asset.ticker}
                asset={asset}
                onClick={() => navigate(`/asset/${asset.ticker}`)}
              />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
