import { PageShell } from "@/components/PageShell";
import { ChevronRight, User, CreditCard, Tag, Globe, Shield, Moon, LogOut, HelpCircle, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Conta",
    items: [
      { icon: User, label: "Perfil", path: "/profile" },
      { icon: CreditCard, label: "Cartões", path: "/cards" },
      { icon: Tag, label: "Categorias", path: "/categories" },
      { icon: Bell, label: "Notificações", path: "/notifications" },
    ],
  },
  {
    title: "Preferências",
    items: [
      { icon: Globe, label: "Moeda padrão", value: "BRL" },
      { icon: Moon, label: "Tema escuro", value: "Ativado" },
    ],
  },
  {
    title: "Segurança",
    items: [
      { icon: Shield, label: "Alterar senha" },
      { icon: HelpCircle, label: "Ajuda e suporte" },
    ],
  },
];

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <div className="px-5 pt-12 pb-6">
        <h1 className="text-lg font-bold text-foreground mb-4">Configurações</h1>

        {/* Profile Card */}
        <div className="rounded-2xl border border-border surface-1 p-4 flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">VB</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Victor Blum</p>
            <p className="text-xs text-muted-foreground">victor@email.com</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{section.title}</p>
            <div className="rounded-xl border border-border surface-1 overflow-hidden divide-y divide-border">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => item.path ? navigate(item.path) : undefined}
                  className="flex items-center gap-3 px-4 py-3.5 w-full text-left hover:bg-accent/30 transition-brand"
                >
                  <item.icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  <span className="flex-1 text-sm text-foreground">{item.label}</span>
                  {item.value ? (
                    <span className="text-xs text-muted-foreground">{item.value}</span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl border border-destructive/20 bg-destructive/5">
          <LogOut className="w-4 h-4 text-loss" strokeWidth={1.5} />
          <span className="text-sm font-medium text-loss">Sair da conta</span>
        </button>

        <p className="text-center text-[10px] text-muted-foreground mt-6">Dinero v1.0.0</p>
      </div>
    </PageShell>
  );
}
