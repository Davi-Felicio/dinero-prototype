import { PageShell } from "@/components/PageShell";
import { CategoryChip } from "@/components/CategoryChip";
import { ChevronLeft, Delete } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const categories = [
  { emoji: "🍔", label: "Alimentação" },
  { emoji: "🚗", label: "Transporte" },
  { emoji: "🏠", label: "Moradia" },
  { emoji: "🎮", label: "Lazer" },
  { emoji: "💊", label: "Saúde" },
  { emoji: "📚", label: "Educação" },
  { emoji: "📱", label: "Assinaturas" },
  { emoji: "📦", label: "Outros" },
];

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "del"];

export default function AddTransaction() {
  const navigate = useNavigate();
  const [value, setValue] = useState("0");
  const [activeCategory, setActiveCategory] = useState("Alimentação");
  const [isExpense, setIsExpense] = useState(true);

  const handleKey = (key: string) => {
    if (key === "del") {
      setValue((v) => (v.length <= 1 ? "0" : v.slice(0, -1)));
    } else if (key === ",") {
      if (!value.includes(",")) setValue((v) => v + ",");
    } else {
      setValue((v) => (v === "0" ? key : v + key));
    }
  };

  const formattedValue = value === "0" ? "0,00" : value;

  return (
    <PageShell className="flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full surface-2 border border-border flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <p className="text-sm font-semibold text-foreground">Nova transação</p>
        <div className="w-9" />
      </div>

      {/* Type Toggle */}
      <div className="px-5 mb-4">
        <div className="flex p-1 rounded-lg surface-2 border border-border">
          <button
            onClick={() => setIsExpense(true)}
            className={`flex-1 py-2 rounded-md text-xs font-medium transition-brand ${
              isExpense ? "bg-destructive/15 text-loss" : "text-muted-foreground"
            }`}
          >
            Despesa
          </button>
          <button
            onClick={() => setIsExpense(false)}
            className={`flex-1 py-2 rounded-md text-xs font-medium transition-brand ${
              !isExpense ? "bg-primary/15 text-success" : "text-muted-foreground"
            }`}
          >
            Receita
          </button>
        </div>
      </div>

      {/* Value Display */}
      <div className="px-5 flex-1 flex flex-col items-center justify-start pt-4">
        <p className="text-xs text-muted-foreground mb-2">Valor</p>
        <div className="flex items-baseline gap-1">
          <span className="text-lg text-muted-foreground font-medium">R$</span>
          <span className={`text-5xl font-bold tabular-nums tracking-tighter-custom ${
            isExpense ? "text-foreground" : "text-success"
          }`}>
            {formattedValue}
          </span>
        </div>
      </div>

      {/* Category Selector */}
      <div className="px-5 mt-4 mb-4">
        <p className="text-xs text-muted-foreground mb-2">Categoria</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5">
          {categories.map((cat) => (
            <CategoryChip
              key={cat.label}
              {...cat}
              isActive={activeCategory === cat.label}
              onClick={() => setActiveCategory(cat.label)}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="px-5 mb-4">
        <input
          type="text"
          placeholder="Descrição (opcional)"
          className="w-full py-3 px-4 rounded-xl surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
      </div>

      {/* Custom Keypad */}
      <div className="px-5 pb-24">
        <div className="grid grid-cols-3 gap-2">
          {keys.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className="h-14 rounded-xl surface-2 flex items-center justify-center text-lg font-medium text-foreground active:bg-accent transition-brand"
            >
              {key === "del" ? <Delete className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} /> : key}
            </button>
          ))}
        </div>
      </div>

      {/* Confirm */}
      <div className="fixed bottom-20 left-0 right-0 px-5 pb-2">
        <button className={`w-full py-3.5 rounded-xl font-semibold text-sm shadow-lg transition-brand active:scale-[0.98] ${
          isExpense
            ? "bg-destructive text-destructive-foreground shadow-destructive/20"
            : "bg-primary text-primary-foreground shadow-primary/20"
        }`}>
          {isExpense ? "Registrar despesa" : "Registrar receita"}
        </button>
      </div>
    </PageShell>
  );
}
