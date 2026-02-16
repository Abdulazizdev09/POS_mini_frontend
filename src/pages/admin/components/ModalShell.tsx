import { X } from "lucide-react";
import type { ReactNode } from "react";

export default function ModalShell({ open, title, onClose, children, footer }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-label="Close modal overlay"
      />

      {/* box */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 transform transition-all">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors active:brightness-90"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-neutral-500" />
          </button>
        </div>

        <div>{children}</div>

        {footer ? <div className="mt-8">{footer}</div> : null}
      </div>
    </div>
  );
}

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
};
