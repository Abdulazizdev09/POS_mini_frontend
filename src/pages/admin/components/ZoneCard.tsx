import { Pencil, Trash2 } from "lucide-react";
import type { ZoneDto } from "../../../types/zone";

type Props = {
    zone: ZoneDto; // "Table 1"
    onEdit: () => void;
    onDelete: () => void;
};

export default function ZoneCard({ zone, onEdit, onDelete }: Props) {
    return (
        <div className="w-full max-w-70 h-62.5 bg-[#d9d9d9] shadow-[0_18px_22px_rgba(0,0,0,0.35)] flex flex-col">
            {/* Top content */}
            <div className="flex-1 flex  flex-col pt-8">
                <div className="text-4xl text-center font-extrabold text-black">{zone.name}</div>
            </div>

            <div className="h-13.5 flex">
                <button
                    onClick={onEdit}
                    className="w-1/2 bg-[#26b24a] active:brightness-90 flex items-center justify-center"
                    aria-label="Edit"
                >
                    <Pencil className="w-9 h-9 text-white" />
                </button>

                <button
                    onClick={onDelete}
                    className="w-1/2 bg-[#ff0000] active:brightness-90 flex items-center justify-center"
                    aria-label="Delete"
                >
                    <Trash2 className="w-9 h-9 text-white" />
                </button>
            </div>
        </div>
    );
}
