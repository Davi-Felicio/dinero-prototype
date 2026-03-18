import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ArrowLeft, Camera, Mail, Phone, Calendar, MapPin, Shield, Eye, EyeOff, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";

export default function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("Victor Blum");
  const [email] = useState("victor@email.com");
  const [phone, setPhone] = useState("+55 11 99999-0000");
  const [birthDate] = useState("15/03/1995");
  const [location, setLocation] = useState("São Paulo, SP");

  // Privacy
  const [biometricLock, setBiometricLock] = useState(true);
  const [hideBalances, setHideBalances] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    toast.success("Perfil atualizado com sucesso!");
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
          <h1 className="text-lg font-bold text-foreground">Perfil</h1>
          <div className="flex-1" />
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="text-xs font-semibold text-primary"
            >
              Editar
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="text-xs font-semibold text-gain"
            >
              Salvar
            </button>
          )}
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">VB</span>
            </div>
            {editing && (
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Camera className="w-3.5 h-3.5 text-primary-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3 mb-6">
          <ProfileField
            icon={<Mail className="w-4 h-4" />}
            label="Nome"
            value={name}
            editing={editing}
            onChange={setName}
          />
          <ProfileField
            icon={<Mail className="w-4 h-4" />}
            label="E-mail"
            value={email}
            editing={false}
            badge="Verificado"
          />
          <ProfileField
            icon={<Phone className="w-4 h-4" />}
            label="Telefone"
            value={phone}
            editing={editing}
            onChange={setPhone}
          />
          <ProfileField
            icon={<Calendar className="w-4 h-4" />}
            label="Data de nascimento"
            value={birthDate}
            editing={false}
          />
          <ProfileField
            icon={<MapPin className="w-4 h-4" />}
            label="Localização"
            value={location}
            editing={editing}
            onChange={setLocation}
          />
        </div>

        {/* Privacy */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Privacidade</p>
          </div>
          <div className="rounded-xl border border-border surface-1 overflow-hidden divide-y divide-border">
            <PrivacyToggle
              icon={<Fingerprint className="w-4 h-4" />}
              label="Bloqueio biométrico"
              description="Exigir biometria ao abrir o app"
              checked={biometricLock}
              onChange={setBiometricLock}
            />
            <PrivacyToggle
              icon={<EyeOff className="w-4 h-4" />}
              label="Ocultar saldos"
              description="Esconder valores na tela inicial"
              checked={hideBalances}
              onChange={setHideBalances}
            />
            <PrivacyToggle
              icon={<Eye className="w-4 h-4" />}
              label="Compartilhamento de dados"
              description="Permitir análises anônimas de uso"
              checked={dataSharing}
              onChange={setDataSharing}
            />
          </div>
        </div>

        {/* Member since */}
        <p className="text-center text-[10px] text-muted-foreground mt-8">
          Membro desde Janeiro 2024
        </p>
      </div>
    </PageShell>
  );
}

function ProfileField({
  icon,
  label,
  value,
  editing,
  onChange,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editing: boolean;
  onChange?: (v: string) => void;
  badge?: string;
}) {
  return (
    <div className="rounded-xl border border-border surface-1 px-4 py-3 flex items-center gap-3">
      <div className="text-muted-foreground">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
        {editing && onChange ? (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none"
          />
        ) : (
          <p className="text-sm text-foreground truncate">{value}</p>
        )}
      </div>
      {badge && (
        <span className="text-[10px] font-medium text-gain bg-gain/10 px-2 py-0.5 rounded-full">{badge}</span>
      )}
    </div>
  );
}

function PrivacyToggle({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="text-muted-foreground">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
