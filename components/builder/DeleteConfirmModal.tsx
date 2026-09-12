"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  description?: string;
}

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Delete Item",
  itemName,
  description,
}: DeleteConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[calc(100vw-2rem)] sm:w-full p-5 sm:p-6 flex flex-col bg-zinc-900 border-zinc-700/60 rounded-2xl shadow-2xl shadow-black/90">
        {/* Header with Trash Icon */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 flex-shrink-0">
            <Trash2 className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <DialogTitle className="text-base sm:text-lg font-semibold text-zinc-100 leading-tight">
              {title}
            </DialogTitle>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              {description ? (
                description
              ) : (
                <>
                  Are you sure you want to remove{" "}
                  {itemName ? (
                    <span className="font-medium text-zinc-200">"{itemName}"</span>
                  ) : (
                    "this item"
                  )}
                  ? This will delete it from your resume.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Actions (Mobile optimized: full-width stacked on mobile, row on desktop) */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-5">
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
            className="w-full sm:w-auto h-9 px-4 text-xs sm:text-sm bg-red-600 hover:bg-red-500 text-white font-medium shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
