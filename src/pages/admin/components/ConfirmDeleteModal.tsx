type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function ConfirmDeleteModal({ open, onClose, onConfirm }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* overlay */}
            <button
                className="absolute inset-0 bg-black/70 cursor-default"
                onClick={onClose}
                aria-label="Close modal overlay"
            />

            {/* modal */}
            <div className="relative w-125 max-w-[92vw] bg-[#d9d9d9] border border-black p-8 flex flex-col items-center text-center">
                <h2 className="text-2xl font-extrabold mb-8">Are you sure that you want to delete this zone?</h2>

                <div className="flex gap-10 mt-4 w-full justify-center">
                    <button
                        onClick={onClose}
                        className="bg-black text-white w-32 py-3 font-extrabold text-xl active:brightness-90"
                    >
                        NO
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-[#ff0000] text-white w-32 py-3 font-extrabold text-xl active:brightness-90"
                    >
                        YES
                    </button>
                </div>
            </div>
        </div>
    );
}
