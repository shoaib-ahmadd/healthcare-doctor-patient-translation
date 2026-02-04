import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { useCreateMessage } from "@/hooks/use-messages";

interface ChatInputProps {
  currentRole: "doctor" | "patient";
  originalLanguage: string;
  targetLanguage: string;
}

export function ChatInput({ currentRole, originalLanguage, targetLanguage }: ChatInputProps) {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutate, isPending } = useCreateMessage();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content.trim() || isPending) return;

    mutate({
      role: currentRole,
      content: content.trim(),
      originalLanguage,
      targetLanguage,
    }, {
      onSuccess: () => {
        setContent("");
        // Reset height
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto relative">
        <form 
          onSubmit={handleSubmit}
          className="
            relative flex items-end gap-2 p-2 bg-muted/30 rounded-2xl border border-input
            focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary
            transition-all duration-200 shadow-sm
          "
        >
          <div className="pl-3 pb-3 text-muted-foreground">
            <Sparkles className="h-5 w-5" />
          </div>

          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Type a message as ${currentRole} (${originalLanguage})...`}
            rows={1}
            disabled={isPending}
            className="
              flex-1 bg-transparent border-0 focus:ring-0 p-3 max-h-32 min-h-[48px]
              resize-none placeholder:text-muted-foreground/70 text-base
            "
          />

          <button
            type="submit"
            disabled={!content.trim() || isPending}
            className="
              mb-1 mr-1 p-3 rounded-xl
              bg-primary text-primary-foreground shadow-md
              hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5
              active:translate-y-0 active:shadow-sm
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:bg-muted disabled:text-muted-foreground
              transition-all duration-200 ease-out
            "
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <p className="text-xs text-center text-muted-foreground mt-2">
          Press Enter to send, Shift + Enter for new line. Auto-translates to {targetLanguage}.
        </p>
      </div>
    </div>
  );
}
