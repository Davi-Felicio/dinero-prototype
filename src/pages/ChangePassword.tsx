import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ArrowLeft, Eye, EyeOff, Lock, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const isValid = currentPassword.length > 0 && hasMinLength && hasUppercase && hasNumber && passwordsMatch;

  const handleSubmit = () => {
    if (!isValid) return;
    toast.success("Senha alterada com sucesso!");
    navigate("/settings");
  };

  return (
    <PageShell>
      <div className="px-5 pt-12 pb-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/settings")}
            className="w-8 h-8 rounded-full surface-2 border border-border flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Alterar senha</h1>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Lock className="w-7 h-7 text-primary" />
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Senha atual</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full py-3 px-4 pr-12 rounded-xl surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Nova senha</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full py-3 px-4 pr-12 rounded-xl surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Password Rules */}
          {newPassword.length > 0 && (
            <div className="space-y-1.5 px-1">
              <PasswordRule met={hasMinLength} label="Mínimo de 8 caracteres" />
              <PasswordRule met={hasUppercase} label="Uma letra maiúscula" />
              <PasswordRule met={hasNumber} label="Um número" />
            </div>
          )}

          {/* Confirm Password */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Confirmar nova senha</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full py-3 px-4 pr-12 rounded-xl surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="text-xs text-destructive mt-1.5 px-1">As senhas não coincidem</p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 transition-brand active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none mt-2"
          >
            Salvar nova senha
          </button>
        </div>
      </div>
    </PageShell>
  );
}

function PasswordRule({ met, label }: { met: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${met ? "bg-gain/20" : "bg-muted"}`}>
        {met && <Check className="w-2.5 h-2.5 text-gain" />}
      </div>
      <span className={`text-xs ${met ? "text-gain" : "text-muted-foreground"}`}>{label}</span>
    </div>
  );
}
