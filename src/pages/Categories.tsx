import { PageShell } from "@/components/PageShell";
import { ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { AddCategoryDialog } from "@/components/AddCategoryDialog";

interface Category {
  name: string;
  emoji: string;
  spent: number;
  budget: number;
  color: string;
}

const defaultCategories: Category[] = [
  { name: "Moradia", emoji: "🏠", spent: 1989.90, budget: 2500, color: "hsl(210, 60%, 50%)" },
  { name: "Alimentação", emoji: "🍔", spent: 687.43, budget: 1000, color: "hsl(25, 80%, 55%)" },
  { name: "Transporte", emoji: "🚗", spent: 324.70, budget: 500, color: "hsl(145, 40%, 48%)" },
  { name: "Lazer", emoji: "🎮", spent: 232.50, budget: 400, color: "hsl(280, 50%, 55%)" },
  { name: "Assinaturas", emoji: "📱", spent: 289.80, budget: 350, color: "hsl(190, 60%, 50%)" },
  { name: "Saúde", emoji: "💊", spent: 89.90, budget: 300, color: "hsl(0, 72%, 51%)" },
  { name: "Educação", emoji: "📚", spent: 49.90, budget: 200, color: "hsl(50, 80%, 50%)" },
];

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [dialogOpen, setDialogOpen] = useState(false);

  const pieData = categories.map((c) => ({ name: c.name, value: c.spent }));
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);

  const handleAddCategory = (newCat: { name: string; emoji: string; budget: number; color: string }) => {
    setCategories((prev) => [
      ...prev,
      { ...newCat, spent: 0 },
    ]);
  };

  return (
    <PageShell>
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-foreground">Categorias</h1>
        <button
          onClick={() => setDialogOpen(true)}
          className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/25 active:scale-95 transition-brand"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Pie Chart */}
      <div className="px-5 flex flex-col items-center">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={categories[i].color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[10px] text-muted-foreground">Total gasto</p>
            <p className="text-lg font-bold tabular-nums tracking-tighter-custom text-foreground">
              R$ {totalSpent.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="px-5 mt-4 pb-24">
        <p className="text-sm font-semibold text-foreground mb-3">Março 2026</p>
        <div className="space-y-3">
          {categories.map((cat) => {
            const pct = cat.budget > 0 ? Math.round((cat.spent / cat.budget) * 100) : 0;
            const isOver = pct >= 100;
            const isWarning = pct >= 80;
            return (
              <button
                key={cat.name}
                onClick={() => navigate(`/category/${encodeURIComponent(cat.name)}`)}
                className="rounded-xl border border-border surface-1 p-4 w-full text-left hover:bg-accent/30 transition-brand"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{cat.emoji}</span>
                    <span className="text-sm font-medium text-foreground">{cat.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="tabular-nums text-muted-foreground">
                    R$ {cat.spent.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / R$ {cat.budget.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  <span className={`font-medium tabular-nums ${isOver ? "text-loss" : isWarning ? "text-warning" : "text-success"}`}>
                    {pct}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-brand"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      backgroundColor: isOver ? "hsl(0, 72%, 51%)" : isWarning ? "hsl(38, 92%, 50%)" : cat.color,
                    }}
                  />
                </div>
              </button>
            );
          })}

          {/* Add category card */}
          <button
            onClick={() => setDialogOpen(true)}
            className="rounded-xl border border-dashed border-border p-4 w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-accent/20 transition-brand"
          >
            <Plus className="w-4 h-4" />
            Criar nova categoria
          </button>
        </div>
      </div>

      <AddCategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={handleAddCategory}
      />
    </PageShell>
  );
}
