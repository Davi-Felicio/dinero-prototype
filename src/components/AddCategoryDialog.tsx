import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (category: { name: string; emoji: string; budget: number; color: string }) => void;
}

const emojiOptions = [
  "🎯", "🎨", "🐶", "✈️", "🎁", "💼", "🏋️", "🛒",
  "☕", "🎵", "📷", "🧹", "👶", "💅", "🔧", "🎓",
  "🏖️", "🚀", "💡", "🌱", "🍷", "🎮", "📦", "💳",
];

const colorOptions = [
  "hsl(210, 60%, 50%)",
  "hsl(25, 80%, 55%)",
  "hsl(145, 40%, 48%)",
  "hsl(280, 50%, 55%)",
  "hsl(190, 60%, 50%)",
  "hsl(0, 72%, 51%)",
  "hsl(50, 80%, 50%)",
  "hsl(330, 65%, 50%)",
  "hsl(170, 55%, 42%)",
  "hsl(260, 70%, 60%)",
  "hsl(15, 90%, 55%)",
  "hsl(200, 75%, 45%)",
];

export function AddCategoryDialog({ open, onOpenChange, onAdd }: AddCategoryDialogProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🎯");
  const [budget, setBudget] = useState("");
  const [color, setColor] = useState(colorOptions[0]);

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Insira um nome para a categoria");
      return;
    }
    if (!budget || Number(budget) <= 0) {
      toast.error("Insira um orçamento válido");
      return;
    }

    onAdd({ name: name.trim(), emoji, budget: Number(budget), color });
    toast.success("Categoria criada!", { description: `${emoji} ${name.trim()}` });

    setName("");
    setEmoji("🎯");
    setBudget("");
    setColor(colorOptions[0]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[360px] rounded-2xl p-5 gap-5">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-foreground">Nova categoria</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Personalize o ícone, nome, cor e orçamento.
          </DialogDescription>
        </DialogHeader>

        {/* Preview */}
        <div className="flex items-center gap-3 p-3 rounded-xl border border-border surface-1">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ backgroundColor: color + "22" }}
          >
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {name || "Nome da categoria"}
            </p>
            <p className="text-xs text-muted-foreground">
              Orçamento: R$ {budget ? Number(budget).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "0,00"}
            </p>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Viagens, Pet, Freelance..."
            maxLength={24}
            className="w-full py-2.5 px-3 rounded-xl border border-border surface-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        {/* Emoji Picker */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ícone</label>
          <div className="grid grid-cols-8 gap-1.5">
            {emojiOptions.map((e) => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-base transition-brand ${
                  emoji === e
                    ? "bg-primary/15 ring-1 ring-primary"
                    : "surface-2 hover:bg-accent/40"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Cor da tag</label>
          <div className="flex gap-2 flex-wrap">
            {colorOptions.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-7 h-7 rounded-full transition-brand ${
                  color === c ? "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110" : "hover:scale-110"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Orçamento mensal</label>
          <div className="flex items-center gap-2 py-2.5 px-3 rounded-xl border border-border surface-2">
            <span className="text-sm text-muted-foreground">R$</span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="0,00"
              min="0"
              step="0.01"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md shadow-primary/20 active:scale-[0.98] transition-brand"
        >
          Criar categoria
        </button>
      </DialogContent>
    </Dialog>
  );
}
