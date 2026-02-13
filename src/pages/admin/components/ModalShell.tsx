import type { ReactNode } from "react";

export default function ModalShell({ open, title, onClose, children, footer }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/70 cursor-default"
        onClick={onClose}
        aria-label="Close modal overlay"
      />

      {/* box */}
      <div className="relative w-205 max-w-[92vw] bg-[#d9d9d9] border border-black p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-extrabold">{title}</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-600 text-white text-2xl font-extrabold flex items-center justify-center active:brightness-90"
            aria-label="Close"
          >
            X
          </button>
        </div>

        <div className="mt-6">{children}</div>

        {footer ? <div className="mt-10 flex justify-end gap-4">{footer}</div> : null}
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
