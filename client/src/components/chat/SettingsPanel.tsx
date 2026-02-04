import { 
  User, 
  Stethoscope, 
  Languages, 
  Check, 
  RefreshCw 
} from "lucide-react";

export const LANGUAGES = [
  "English", "Spanish", "French", "German", "Chinese", 
  "Japanese", "Korean", "Hindi", "Arabic", "Portuguese",
  "Russian", "Italian"
];

interface SettingsPanelProps {
  currentRole: "doctor" | "patient";
  onRoleChange: (role: "doctor" | "patient") => void;
  doctorLanguage: string;
  onDoctorLanguageChange: (lang: string) => void;
  patientLanguage: string;
  onPatientLanguageChange: (lang: string) => void;
  onClearChat: () => void;
  isClearing: boolean;
}

export function SettingsPanel({
  currentRole,
  onRoleChange,
  doctorLanguage,
  onDoctorLanguageChange,
  patientLanguage,
  onPatientLanguageChange,
  onClearChat,
  isClearing
}: SettingsPanelProps) {
  return (
    <div className="bg-card border-b md:border-b-0 md:border-r border-border h-full md:w-80 flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Session Control
        </h2>
        
        {/* Role Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl mb-6">
          <button
            onClick={() => onRoleChange("doctor")}
            className={`
              flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all
              ${currentRole === "doctor" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-white/50"
              }
            `}
          >
            <Stethoscope size={16} />
            Doctor
          </button>
          <button
            onClick={() => onRoleChange("patient")}
            className={`
              flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all
              ${currentRole === "patient" 
                ? "bg-white text-emerald-600 shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-white/50"
              }
            `}
          >
            <User size={16} />
            Patient
          </button>
        </div>

        {/* Current Active Role Indicator */}
        <div className={`
          p-4 rounded-xl border flex items-center gap-3 mb-6
          ${currentRole === "doctor" 
            ? "bg-blue-50/50 border-blue-100" 
            : "bg-emerald-50/50 border-emerald-100"
          }
        `}>
          <div className={`
            h-2 w-2 rounded-full animate-pulse
            ${currentRole === "doctor" ? "bg-blue-500" : "bg-emerald-500"}
          `} />
          <span className="text-sm font-medium">
            You are speaking as <span className="font-bold">{currentRole === "doctor" ? "Doctor" : "Patient"}</span>
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Languages size={14} />
          Language Settings
        </h2>

        {/* Doctor Language */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Stethoscope size={12} />
            </div>
            Doctor Speaks
          </label>
          <select 
            value={doctorLanguage}
            onChange={(e) => onDoctorLanguageChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            {LANGUAGES.map(lang => (
              <option key={`doc-${lang}`} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Patient Language */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <User size={12} />
            </div>
            Patient Speaks
          </label>
          <select 
            value={patientLanguage}
            onChange={(e) => onPatientLanguageChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            {LANGUAGES.map(lang => (
              <option key={`pat-${lang}`} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-border">
          <button
            onClick={onClearChat}
            disabled={isClearing}
            className="
              w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg 
              text-sm font-medium text-destructive bg-destructive/5 hover:bg-destructive/10
              transition-colors disabled:opacity-50
            "
          >
            {isClearing ? <RefreshCw className="animate-spin h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
            Reset Conversation
          </button>
        </div>
      </div>
    </div>
  );
}
