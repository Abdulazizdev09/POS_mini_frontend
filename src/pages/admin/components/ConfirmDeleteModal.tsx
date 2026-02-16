import { Trash2, X } from "lucide-react";
import ModalShell from "./ModalShell";

type Props = {
    open: boolean;
    title?: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
};

export default function ConfirmDeleteModal({
    open,
    title = "Confirm",
    message,
    onClose,
    onConfirm,
    confirmText = "Delete",
    cancelText = "Cancel",
}: Props
) {
    return (
        <ModalShell
            open={open}
            title={title}
            onClose={onClose}
            footer={
                <div className="flex gap-3 w-full">
                    <button
                        onClick={onClose}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-neutral-200 text-neutral-900 rounded-lg transition-colors text-lg font-medium cursor-pointer active:brightness-90"
                    >
                        <X className="w-5 h-5" />
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white rounded-lg transition-colors text-lg font-medium cursor-pointer active:brightness-90"
                    >
                        <Trash2 className="w-5 h-5" />
                        {confirmText}
                    </button>
                </div>
            }
        >
            <div className="text-center py-4">
                <p className="text-xl text-neutral-900 font-medium">{message}</p>
            </div>
        </ModalShell>
    );
}
