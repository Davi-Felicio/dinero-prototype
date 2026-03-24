import { PageShell } from "@/components/PageShell";
import { ChevronRight, User, CreditCard, Tag, Globe, Shield, Moon, LogOut, HelpCircle, Bell, ArrowLeftRight, Sun, ExternalLink, MessageCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleLogout = () => {
    setLogoutOpen(false);
    navigate("/login");
  };

  const sections = [
    {
      title: "Conta",
      items: [
        { icon: User, label: "Perfil", path: "/profile" },
        { icon: CreditCard, label: "Cartões", path: "/cards" },
        { icon: ArrowLeftRight, label: "Todas as transações", path: "/transactions" },
        { icon: Tag, label: "Categorias", path: "/categories" },
        { icon: Bell, label: "Notificações", path: "/notifications" },
      ],
    },
    {
      title: "Preferências",
      items: [
        { icon: Globe, label: "Moeda padrão", path: "/currencies", value: "BRL" },
        { icon: darkMode ? Moon : Sun, label: "Tema escuro", toggle: true },
      ],
    },
    {
      title: "Segurança",
      items: [
        { icon: Shield, label: "Alterar senha", path: "/change-password" },
        { icon: HelpCircle, label: "Ajuda e suporte", action: () => setHelpOpen(true) },
      ],
    },
  ];

  return (
    <PageShell>
      <div className="px-5 pt-12 pb-6">
        <h1 className="text-lg font-bold text-foreground mb-4">Configurações</h1>

        {/* Profile Card */}
        <button
          onClick={() => navigate("/profile")}
          className="w-full rounded-2xl border border-border surface-1 p-4 flex items-center gap-3 mb-6 text-left transition-brand hover:bg-accent/30 active:scale-[0.99]"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">VB</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Victor Blum</p>
            <p className="text-xs text-muted-foreground">victor@email.com</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{section.title}</p>
            <div className="rounded-xl border border-border surface-1 overflow-hidden divide-y divide-border">
              {section.items.map((item) => {
                if (item.toggle) {
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 px-4 py-3.5 w-full"
                    >
                      <item.icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                      <span className="flex-1 text-sm text-foreground">{item.label}</span>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>
                  );
                }
                return (
                  <button
                    key={item.label}
                    onClick={() => item.path ? navigate(item.path) : item.action?.()}
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
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={() => setLogoutOpen(true)}
          className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl border border-destructive/20 bg-destructive/5 transition-brand hover:bg-destructive/10 active:scale-[0.99]"
        >
          <LogOut className="w-4 h-4 text-loss" strokeWidth={1.5} />
          <span className="text-sm font-medium text-loss">Sair da conta</span>
        </button>

        <p className="text-center text-[10px] text-muted-foreground mt-6">Dinero v1.0.0</p>
      </div>

      {/* Logout Confirmation */}
      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent className="bg-card border-border max-w-[340px] rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Sair da conta?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              Você precisará fazer login novamente para acessar sua conta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-border text-foreground hover:bg-accent">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Help Dialog */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="bg-card border-border max-w-[380px] rounded-2xl p-0 gap-0">
          <DialogHeader className="p-5 pb-3">
            <DialogTitle className="text-foreground text-lg font-bold">Ajuda e suporte</DialogTitle>
          </DialogHeader>
          <div className="px-5 pb-5 space-y-2">
            <button className="w-full flex items-center gap-3 py-3 px-4 rounded-xl surface-2 border border-border text-left transition-brand hover:bg-accent/30">
              <MessageCircle className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-sm text-foreground">Fale conosco</p>
                <p className="text-[10px] text-muted-foreground">Envie uma mensagem para o suporte</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-3 py-3 px-4 rounded-xl surface-2 border border-border text-left transition-brand hover:bg-accent/30">
              <HelpCircle className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-sm text-foreground">Perguntas frequentes</p>
                <p className="text-[10px] text-muted-foreground">Encontre respostas rápidas</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-3 py-3 px-4 rounded-xl surface-2 border border-border text-left transition-brand hover:bg-accent/30">
              <FileText className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-sm text-foreground">Termos de uso</p>
                <p className="text-[10px] text-muted-foreground">Política de privacidade e termos</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <p className="text-center text-[10px] text-muted-foreground pt-2">
              suporte@dinero.app · v1.0.0
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
