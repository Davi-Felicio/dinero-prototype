import { PageShell } from "@/components/PageShell";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const categories = [
  { name: "Moradia", emoji: "🏠", spent: 1989.90, budget: 2500, color: "hsl(210, 60%, 50%)" },
  { name: "Alimentação", emoji: "🍔", spent: 687.43, budget: 1000, color: "hsl(25, 80%, 55%)" },
  { name: "Transporte", emoji: "🚗", spent: 324.70, budget: 500, color: "hsl(145, 40%, 48%)" },
  { name: "Lazer", emoji: "🎮", spent: 232.50, budget: 400, color: "hsl(280, 50%, 55%)" },
  { name: "Assinaturas", emoji: "📱", spent: 289.80, budget: 350, color: "hsl(190, 60%, 50%)" },
  { name: "Saúde", emoji: "💊", spent: 89.90, budget: 300, color: "hsl(0, 72%, 51%)" },
  { name: "Educação", emoji: "📚", spent: 49.90, budget: 200, color: "hsl(50, 80%, 50%)" },
];

const pieData = categories.map((c) => ({ name: c.name, value: c.spent }));

export default function Categories() {
  const navigate = useNavigate();
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);

  return (
    <PageShell>
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-lg font-bold text-foreground">Categorias</h1>
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
      <div className="px-5 mt-4">
        <p className="text-sm font-semibold text-foreground mb-3">Março 2026</p>
        <div className="space-y-3">
          {categories.map((cat) => {
            const pct = Math.round((cat.spent / cat.budget) * 100);
            const isOver = pct >= 100;
            const isWarning = pct >= 80;
            return (
              <div key={cat.name} className="rounded-xl border border-border surface-1 p-4">
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
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
