import { Save, X } from "lucide-react";
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

export default function EditZoneModal({ open, value, onChange, onClose, onSave, title = "Edit Zone" }: Props) {
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
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-neutral-200 text-neutral-900 rounded-lg transition-colors text-lg font-medium cursor-pointer active:brightness-90"
                    >
                        <X className="w-5 h-5" />
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-lg transition-colors text-lg font-medium cursor-pointer active:brightness-90"
                    >
                        <Save className="w-5 h-5" />
                        Save
                    </button>
                </div>
            }
        >
            <div className="space-y-6">
                <div>
                    <label className="block text-base font-medium text-neutral-700 mb-2">
                        Zone Name <span className="text-red-700">*</span>
                    </label>
                    <input
                        value={value.name}
                        onChange={(e) => {
                            onChange({ ...value, name: e.target.value });
                            setTouched(true);
                        }}
                        onBlur={() => setTouched(true)}
                        placeholder="Enter zone name"
                        className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none transition-colors ${showError ? "border-red-500 bg-red-50" : "border-neutral-300 bg-white focus:border-blue-600"
                            }`}
                        autoFocus
                    />
                    {showError && <p className="text-red-700 font-bold mt-2">Name is required</p>}
                </div>

                <div>
                    <label className="block text-base font-medium text-neutral-700 mb-2">
                        Description
                    </label>
                    <textarea
                        value={value.description}
                        onChange={(e) => onChange({ ...value, description: e.target.value })}
                        placeholder="Enter description"
                        rows={3}
                        className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white transition-colors resize-none"
                    />
                </div>
            </div>
        </ModalShell>
    );
}
