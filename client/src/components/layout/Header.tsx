import { Activity, Stethoscope } from "lucide-react";

export function Header({
  onGenerateSummary,
  isGenerating,
}: {
  onGenerateSummary: () => void;
  isGenerating: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg md:text-xl leading-none text-foreground">
              MediLink Translate
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Real-time Doctor-Patient Translation
            </p>
          </div>
        </div>

        <button
          onClick={onGenerateSummary}
          disabled={isGenerating}
          className="
            hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
            bg-white border border-border shadow-sm text-foreground
            hover:bg-muted/50 hover:text-primary hover:border-primary/20
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
          "
        >
          {isGenerating ? (
            <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <Stethoscope className="h-4 w-4" />
          )}
          <span>{isGenerating ? "Analyzing..." : "Medical Summary"}</span>
        </button>
      </div>
    </header>
  );
}
