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
    confirmText = "YES",
    cancelText = "NO",
}: Props
) {
    return (
        <ModalShell
            open={open}
            title={title}
            onClose={onClose}
            footer={
                <>
                    <button
                        onClick={onClose}
                        className="bg-black text-white w-32 py-3 font-extrabold text-xl active:brightness-90">
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-[#ff0000] text-white w-32 py-3 font-extrabold text-xl active:brightness-90">
                        {confirmText}
                    </button>
                </>
            }
        >
            <div className="text-center text-2xl font-extrabold">{message}</div>
        </ModalShell>
    );
}
