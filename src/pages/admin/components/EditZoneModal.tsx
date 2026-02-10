import { useState } from "react";

type Props = {
    open: boolean;
    value: { name: string, description: string }
    onChange: (v: { name: string, description: string }) => void;
    onClose: () => void;
    onSave: () => void;
    title?: string;
};

export default function EditZoneModal({ open, value, onChange, onClose, onSave, title = "Change Zone Info" }: Props) {
    const [attemptedSave, setAttemptedSave] = useState(false);
    const [touched, setTouched] = useState(false);
    const [prevOpen, setPrevOpen] = useState(open);

    if (open !== prevOpen) {
        setPrevOpen(open);
        if (open) {
            setAttemptedSave(false);
            setTouched(false);
        }
    }

    if (!open) return null;

    const handleSave = () => {
        if (!value.name.trim()) {
            setAttemptedSave(true);
            return;
        }
        onSave();
    };

    const showError = (attemptedSave || touched) && !value.name.trim();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* overlay */}
            <button
                className="absolute inset-0 bg-black/70 cursor-default"
                onClick={onClose}
                aria-label="Close modal overlay"
            />

            {/* modal */}
            <div className="relative w-205 max-w-[92vw] bg-[#d9d9d9] border border-black p-8">
                {/* header */}
                <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-extrabold">{title}</h2>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-red-600 text-white text-2xl font-extrabold flex items-center justify-center active:brightness-90"
                        aria-label="Close"
                    >
                        X
                    </button>
                </div>

                {/* fields */}
                <div className="mt-6 space-y-6">
                    <div>
                        <label className="block text-xl font-extrabold mb-2">
                            Name: <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={value.name}
                            onChange={(e) => onChange({ ...value, name: e.target.value })}
                            onBlur={() => setTouched(true)}
                            className={`w-105 required max-w-full border p-3 text-xl outline-none ${showError ? "border-red-500 bg-red-50" : "border-black bg-white"
                                }`}
                            placeholder="Zone name"
                        />
                        {showError && (
                            <p className="text-red-500 mt-1 text-sm font-bold">Name is required</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xl font-extrabold mb-2">Description:</label>
                        <textarea
                            value={value.description}
                            onChange={(e) => onChange({ ...value, description: e.target.value })}
                            className="w-105 max-w-full h-27.5 border border-black bg-white p-3 text-xl outline-none resize-none"
                            placeholder="Zone description"
                        />
                    </div>
                </div>

                {/* footer */}
                <div className="mt-10 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="px-10 py-4 bg-[#26b24a] text-white text-2xl font-extrabold active:brightness-90"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
