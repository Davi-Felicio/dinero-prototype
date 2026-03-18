import { PageShell } from "@/components/PageShell";
import { CategoryChip } from "@/components/CategoryChip";
import { ChevronLeft, Delete, CalendarDays, MapPin, Building2, Repeat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface CategoryConfig {
  emoji: string;
  label: string;
  showDueDate?: boolean;
  showRecurrence?: boolean;
  showLocation?: boolean;
  showProvider?: boolean;
  placeholderDesc?: string;
  dueDateLabel?: string;
}

const categories: CategoryConfig[] = [
  {
    emoji: "🍔", label: "Alimentação",
    showLocation: true,
    placeholderDesc: "Ex: Supermercado, restaurante...",
  },
  {
    emoji: "🚗", label: "Transporte",
    showLocation: true,
    placeholderDesc: "Ex: Uber, gasolina, estacionamento...",
  },
  {
    emoji: "🏠", label: "Moradia",
    showDueDate: true,
    showRecurrence: true,
    dueDateLabel: "Vencimento",
    placeholderDesc: "Ex: Aluguel, condomínio, IPTU...",
  },
  {
    emoji: "🎮", label: "Lazer",
    placeholderDesc: "Ex: Cinema, streaming, jogos...",
  },
  {
    emoji: "💊", label: "Saúde",
    showDueDate: true,
    placeholderDesc: "Ex: Consulta, farmácia, plano...",
    dueDateLabel: "Data da consulta",
  },
  {
    emoji: "📚", label: "Educação",
    showDueDate: true,
    showRecurrence: true,
    dueDateLabel: "Vencimento",
    placeholderDesc: "Ex: Mensalidade, curso, livro...",
  },
  {
    emoji: "📱", label: "Assinaturas",
    showDueDate: true,
    showRecurrence: true,
    showProvider: true,
    dueDateLabel: "Dia de cobrança",
    placeholderDesc: "Ex: Netflix, Spotify, iCloud...",
  },
  {
    emoji: "📦", label: "Outros",
    placeholderDesc: "Descrição (opcional)",
  },
];

const recurrenceOptions = ["Única", "Mensal", "Semanal", "Anual"];

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "del"];

export default function AddTransaction() {
  const navigate = useNavigate();
  const [value, setValue] = useState("0");
  const [activeCategory, setActiveCategory] = useState("Alimentação");
  const [isExpense, setIsExpense] = useState(true);
  const [dueDate, setDueDate] = useState<Date>();
  const [recurrence, setRecurrence] = useState("Única");
  const [description, setDescription] = useState("");

  const activeCatConfig = categories.find((c) => c.label === activeCategory) || categories[0];

  const handleKey = (key: string) => {
    if (key === "del") {
      setValue((v) => (v.length <= 1 ? "0" : v.slice(0, -1)));
    } else if (key === ",") {
      if (!value.includes(",")) setValue((v) => v + ",");
    } else {
      setValue((v) => (v === "0" ? key : v + key));
    }
  };

  const handleCategoryChange = (label: string) => {
    setActiveCategory(label);
    setDueDate(undefined);
    setRecurrence("Única");
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
      <div className="px-5 flex flex-col items-center pt-2 pb-3">
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
      <div className="px-5 mb-3">
        <p className="text-xs text-muted-foreground mb-2">Categoria</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5">
          {categories.map((cat) => (
            <CategoryChip
              key={cat.label}
              emoji={cat.emoji}
              label={cat.label}
              isActive={activeCategory === cat.label}
              onClick={() => handleCategoryChange(cat.label)}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="px-5 mb-3">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={activeCatConfig.placeholderDesc || "Descrição (opcional)"}
          className="w-full py-3 px-4 rounded-xl surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
      </div>

      {/* Category-specific fields */}
      <div className="px-5 mb-3 space-y-2">
        {/* Due Date */}
        {activeCatConfig.showDueDate && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full flex items-center gap-3 py-3 px-4 rounded-xl surface-2 border border-border text-sm transition-brand hover:bg-accent/30">
                <CalendarDays className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <span className={cn("flex-1 text-left", dueDate ? "text-foreground" : "text-muted-foreground")}>
                  {dueDate
                    ? `${activeCatConfig.dueDateLabel}: ${format(dueDate, "dd 'de' MMM, yyyy", { locale: ptBR })}`
                    : `${activeCatConfig.dueDateLabel || "Vencimento"} (opcional)`
                  }
                </span>
                {dueDate && (
                  <span
                    onClick={(e) => { e.stopPropagation(); setDueDate(undefined); }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        )}

        {/* Recurrence */}
        {activeCatConfig.showRecurrence && (
          <div className="w-full flex items-center gap-3 py-2.5 px-4 rounded-xl surface-2 border border-border">
            <Repeat className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-sm text-muted-foreground">Recorrência</span>
            <div className="flex-1 flex justify-end gap-1.5">
              {recurrenceOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setRecurrence(opt)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-brand ${
                    recurrence === opt
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Location hint for food/transport */}
        {activeCatConfig.showLocation && (
          <div className="w-full flex items-center gap-3 py-3 px-4 rounded-xl surface-2 border border-border text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Local (opcional)"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        )}

        {/* Provider for subscriptions */}
        {activeCatConfig.showProvider && (
          <div className="w-full flex items-center gap-3 py-3 px-4 rounded-xl surface-2 border border-border text-sm">
            <Building2 className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Provedor / empresa (opcional)"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        )}
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
      <div className="fixed bottom-20 left-0 right-0 px-5 pb-2 max-w-[430px] mx-auto">
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
