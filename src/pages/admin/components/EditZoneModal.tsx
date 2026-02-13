import { useState } from "react";
import ModalShell from "./ModalShell";

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

    if (!open) return null;

    const showError = (attemptedSave || touched) && !value.name.trim();

    const handleSave = () => {
        if (!value.name.trim()) {
            setAttemptedSave(true);
            return;
        }
        onSave();
    };


    return (
        <ModalShell
            open={open}
            title={title}
            onClose={onClose}
            footer={
                <button
                    onClick={handleSave}
                    className="px-10 py-4 bg-[#26b24a] text-white text-2xl font-extrabold active:brightness-90"
                >
                    Save
                </button>
            }
        >
            <div className="space-y-6">
                <div>
                    <label className="block text-xl font-extrabold mb-2">
                        Name:<span className="text-red-500">*</span>
                    </label>
                    <input
                        value={value.name}
                        onChange={(e) => onChange({ ...value, name: e.target.value })}
                        onBlur={() => setTouched(true)}
                        className={`w-105 max-w-full border p-3 text-xl outline-none ${showError ? "border-red-500 bg-red-50" : "border-black bg-white"
                            }`}
                        placeholder="Zone name"
                    />
                    {showError && <p className="text-red-500 mt-1 text-sm font-bold">Name is required</p>}

                </div>
                <div>
                    <label className="block text-xl font-extrabold mb-2">Description:</label>
                    <textarea
                        value={value.description}
                        onChange={(e) => onChange({ ...value, description: e.target.value })}
                        className="w-105 max-w-full h-27 border border-black bg-white p-3 text-xl outline-none resize-none"
                        placeholder="Zone description"
                    />
                </div>
            </div>

        </ModalShell>

    );
}
