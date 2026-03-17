import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { CalendarIcon, Plus } from "lucide-react";

const assetTypes = ["Ações", "FIIs", "BDRs", "ETFs", "Renda Fixa", "Cripto"];

const assetsByType: Record<string, string[]> = {
  "Ações": ["PETR4", "VALE3", "ITUB4", "BBDC4", "ABEV3", "WEGE3"],
  "FIIs": ["MXRF11", "HGLG11", "XPML11", "KNRI11", "VISC11"],
  "BDRs": ["AAPL34", "MSFT34", "AMZO34", "GOGL34", "TSLA34"],
  "ETFs": ["IVVB11", "BOVA11", "HASH11", "SMAL11"],
  "Renda Fixa": ["Tesouro Selic", "Tesouro IPCA+", "CDB", "LCI/LCA"],
  "Cripto": ["BTC", "ETH", "SOL", "ADA"],
};

interface AddAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddAssetDialog({ open, onOpenChange }: AddAssetDialogProps) {
  const [isBuy, setIsBuy] = useState(true);
  const [assetType, setAssetType] = useState("Ações");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("0,00");
  const [otherCosts, setOtherCosts] = useState("0,00");

  const parseBRL = (v: string) => parseFloat(v.replace(".", "").replace(",", ".")) || 0;
  const totalValue = parseBRL(price) * (parseInt(quantity) || 0) + parseBRL(otherCosts);

  const handleReset = () => {
    setIsBuy(true);
    setAssetType("Ações");
    setSelectedAsset("");
    setDate(new Date().toISOString().split("T")[0]);
    setQuantity("1");
    setPrice("0,00");
    setOtherCosts("0,00");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) handleReset(); }}>
      <DialogContent className="bg-card border-border max-w-[400px] mx-auto p-0 gap-0 rounded-2xl">
        <DialogHeader className="p-5 pb-4">
          <DialogTitle className="text-foreground text-lg font-bold">Adicionar Lançamento</DialogTitle>
        </DialogHeader>

        {/* Buy/Sell Toggle */}
        <div className="px-5 mb-4">
          <div className="flex p-1 rounded-xl surface-2 border border-border">
            <button
              onClick={() => setIsBuy(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-brand flex items-center justify-center gap-2 ${
                isBuy ? "bg-primary/15 text-success" : "text-muted-foreground"
              }`}
            >
              <span className="text-base">💰</span> Compra
            </button>
            <button
              onClick={() => setIsBuy(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-brand flex items-center justify-center gap-2 ${
                !isBuy ? "bg-destructive/15 text-loss" : "text-muted-foreground"
              }`}
            >
              <span className="text-base">💸</span> Venda
            </button>
          </div>
        </div>

        {/* Asset Type & Asset */}
        <div className="px-5 mb-3 grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Tipo de ativo</label>
            <select
              value={assetType}
              onChange={(e) => { setAssetType(e.target.value); setSelectedAsset(""); }}
              className="w-full py-2.5 px-3 rounded-xl surface-2 border border-border text-sm text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
            >
              {assetTypes.map((t) => (
                <option key={t} value={t} className="bg-card text-foreground">{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Ativo</label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl surface-2 border border-border text-sm text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
            >
              <option value="" className="bg-card text-muted-foreground">Selecionar</option>
              {(assetsByType[assetType] || []).map((a) => (
                <option key={a} value={a} className="bg-card text-foreground">{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date & Quantity */}
        <div className="px-5 mb-3 grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">
              {isBuy ? "Data da compra" : "Data da venda"}
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full py-2.5 pl-9 pr-3 rounded-xl surface-2 border border-border text-sm text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Quantidade</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl surface-2 border border-border text-sm text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Price & Other Costs */}
        <div className="px-5 mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Preço em R$</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl surface-2 border border-border text-sm text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">
              Outros custos <span className="text-muted-foreground/60">(Opcional)</span>
            </label>
            <input
              type="text"
              value={otherCosts}
              onChange={(e) => setOtherCosts(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl surface-2 border border-border text-sm text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Total */}
        <div className="mx-5 mb-4 py-3 px-4 rounded-xl bg-accent/50 border border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Valor total</span>
          <span className="text-sm font-bold tabular-nums text-foreground">
            R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex items-center justify-between gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="text-sm text-muted-foreground hover:text-foreground transition-brand"
          >
            Cancelar
          </button>
          <button
            className={`flex-1 max-w-[200px] py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-brand active:scale-[0.98] ${
              isBuy
                ? "bg-primary text-primary-foreground shadow-primary/20"
                : "bg-destructive text-destructive-foreground shadow-destructive/20"
            }`}
          >
            <Plus className="w-4 h-4" />
            Adicionar Lançamento
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
