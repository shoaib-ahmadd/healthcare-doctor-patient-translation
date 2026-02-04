import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Download, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: string;
}

export function SummaryModal({ isOpen, onClose, summary }: SummaryModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col gap-0 p-0 rounded-2xl">
        <div className="p-6 bg-slate-50 border-b border-border">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <FileText className="h-6 w-6" />
              </div>
              <DialogTitle className="text-xl font-display text-slate-800">Medical Summary</DialogTitle>
            </div>
            <DialogDescription className="text-slate-500">
              AI-generated clinical summary of the current conversation session.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 overflow-y-auto bg-white">
          <div className="prose prose-slate prose-sm max-w-none">
            {/* Simple rendering of text with line breaks */}
            {summary.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="
              flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium
              shadow-md shadow-slate-900/10 hover:bg-slate-800 hover:shadow-lg transition-all
            "
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check size={16} /> Copied
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Download size={16} /> Copy to Clipboard
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
