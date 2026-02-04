import { motion } from "framer-motion";
import { format } from "date-fns";
import { User, Stethoscope } from "lucide-react";
import type { Message } from "@shared/schema";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean; // Is the viewer the author?
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  const isDoctor = message.role === "doctor";
  
  // Doctor messages align left if viewer is Patient, right if viewer is Doctor.
  // Wait, standard pattern: "My messages" are right, "Their messages" are left.
  const alignRight = isCurrentUser;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex w-full mb-6 ${alignRight ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${alignRight ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* Avatar */}
        <div className={`
          flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm mt-1
          ${isDoctor ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"}
        `}>
          {isDoctor ? <Stethoscope size={16} /> : <User size={16} />}
        </div>

        {/* Bubble Content */}
        <div className="flex flex-col gap-1">
          <div className={`
            relative p-4 rounded-2xl shadow-sm border
            ${alignRight 
              ? "bg-primary text-primary-foreground rounded-tr-none border-primary/20" 
              : "bg-card text-card-foreground rounded-tl-none border-border"
            }
          `}>
            {/* Original Text */}
            <p className="text-sm md:text-base leading-relaxed font-medium">
              {message.content}
            </p>

            {/* Translated Text - Displayed with distinct visual treatment */}
            {message.translatedContent && (
              <div className={`
                mt-3 pt-3 border-t text-sm italic
                ${alignRight ? "border-white/20 text-blue-50" : "border-border text-muted-foreground"}
              `}>
                <div className="flex items-center gap-2 mb-1 opacity-75 text-xs uppercase tracking-wider font-semibold">
                  <span>Translation ({message.targetLanguage})</span>
                </div>
                {message.translatedContent}
              </div>
            )}
          </div>

          {/* Meta */}
          <span className={`
            text-[10px] text-muted-foreground font-medium px-1
            ${alignRight ? "text-right" : "text-left"}
          `}>
            {format(new Date(message.timestamp), "h:mm a")} • {message.originalLanguage}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
