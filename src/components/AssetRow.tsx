import { SparkLine } from "./SparkLine";

interface AssetRowProps {
  ticker: string;
  name: string;
  quantity: number;
  price: number;
  change: number;
  sparkData: number[];
  onClick?: () => void;
}

export function AssetRow({ ticker, name, quantity, price, change, sparkData, onClick }: AssetRowProps) {
  const isPositive = change >= 0;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 py-3 px-1 w-full text-left transition-brand hover:bg-accent/50 rounded-lg"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{ticker}</p>
        <p className="text-xs text-muted-foreground">{quantity} un · {name}</p>
      </div>

      <div className="px-2">
        <SparkLine
          data={sparkData}
          color={isPositive ? "hsl(145, 40%, 48%)" : "hsl(0, 72%, 51%)"}
        />
      </div>

      <div className="text-right min-w-[80px]">
        <p className="text-sm font-medium tabular-nums tracking-tighter-custom text-foreground">
          R$ {price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
        <p className={`text-xs tabular-nums ${isPositive ? "text-success" : "text-loss"}`}>
          {isPositive ? "+" : ""}{change.toFixed(2)}%
        </p>
      </div>
    </button>
  );
}
