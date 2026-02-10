import { Plus } from "lucide-react";

type Props = {
    onClick: () => void;
};

export default function CreateZoneCard({ onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="w-full max-w-70 h-62.5 bg-[#d9d9d9] shadow-[0_18px_22px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center cursor-pointer active:brightness-95"
            aria-label="Create new zone"
        >
             <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-12 h-12 text-white" />
            </div>
            <div className="text-3xl font-extrabold ">Create Zone</div>
        </button>
    );
}
