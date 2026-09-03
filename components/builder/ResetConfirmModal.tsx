"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";

interface ResetConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ResetConfirmModal({
  open,
  onClose,
  onConfirm,
}: ResetConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[calc(100vw-2rem)] sm:w-full p-5 sm:p-6 flex flex-col bg-zinc-900 border-zinc-700/60 rounded-2xl shadow-2xl shadow-black/90">
        {/* Header with Warning Icon */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex-shrink-0">
            <RotateCcw className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <DialogTitle className="text-base sm:text-lg font-semibold text-zinc-100 leading-tight">
              Reset to Demo Data?
            </DialogTitle>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              This will overwrite all sections and restore the default sample resume.
            </p>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="my-4 p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-rose-400">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>What will be reset:</span>
          </div>
          <ul className="text-[11px] sm:text-xs text-zinc-400 space-y-1.5 pl-1">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">•</span>
              <span>All customized information (Profile, Experience, Skills, Projects, Education) will revert to sample data.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">•</span>
              <span>Sections will return to their default ordering.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 mt-0.5">•</span>
              <span>All hidden sections will be unhidden.</span>
            </li>
          </ul>
        </div>

        {/* Actions (Mobile optimized: full-width stacked on mobile, row on desktop) */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto h-9 px-4 text-xs sm:text-sm border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-auto h-9 px-4 text-xs sm:text-sm bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-600/20 hover:shadow-rose-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Everything</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
