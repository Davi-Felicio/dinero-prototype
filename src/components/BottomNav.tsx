import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, TrendingUp, PlusCircle, Settings } from "lucide-react";

const tabs = [
  { icon: LayoutDashboard, label: "Home", path: "/" },
  { icon: ArrowLeftRight, label: "Transações", path: "/transactions" },
  { icon: PlusCircle, label: "Adicionar", path: "/add", isCenter: true },
  { icon: TrendingUp, label: "Portfólio", path: "/portfolio" },
  { icon: Settings, label: "Config", path: "/settings" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border surface-1 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          if (tab.isCenter) {
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <tab.icon className="w-5 h-5 text-primary-foreground" />
                </div>
              </button>
            );
          }
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-0.5 py-1 px-3 transition-brand"
            >
              <tab.icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span
                className={`text-[10px] ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
