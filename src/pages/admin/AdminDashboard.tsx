import { useNavigate } from "react-router-dom";
import {
    MapPin,
    Grid3X3,
    Tablet,
    LayoutGrid,
    UtensilsCrossed,
    SlidersHorizontal,
    ListChecks,
} from "lucide-react";

type Card = {
    title: string;
    desc: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
};

export default function AdminDashboard() {
    const navigate = useNavigate();

    const cards: Card[] = [
        { title: "Zones", desc: "Create / Edit / Delete zones", path: "/admin/zones", icon: MapPin },
        { title: "Tables", desc: "Assign tables to zones", path: "/admin/tables", icon: Grid3X3 },
        { title: "Devices", desc: "Link tablets to tables", path: "/admin/devices", icon: Tablet },
        { title: "Categories", desc: "Menu category setup", path: "/admin/categories", icon: LayoutGrid },
        { title: "Items", desc: "Menu items + prices", path: "/admin/items", icon: UtensilsCrossed },
        { title: "Modifier Groups", desc: "Single / Multi choice groups", path: "/admin/modifier-groups", icon: SlidersHorizontal },
        { title: "Modifier Options", desc: "Options + price delta", path: "/admin/modifier-options", icon: ListChecks },
    ];

    return (
        <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-7xl">
                <div className="mb-6">
                    <h2 className="text-3xl font-extrabold">Admin Dashboard</h2>
                    <h2 className="text-xl">Manage restaurant settings and menu</h2>
                </div>
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((c) => {
                        const Icon = c.icon;
                        return (
                            <button
                                key={c.path}
                                onClick={() => navigate(c.path)}
                                className="w-full text-left border border-black bg-white p-6 min-h-50 flex items-center justify-between
                                            active:translate-y-px active:bg-gray-100 focus:outline-none cursor-pointer ">
                                <div className="pr-4">
                                    <h3 className="text-3xl font-extrabold">{c.title}</h3>
                                    <p className="text-base opacity-80 mt-2">{c.desc}</p>
                                </div>
                                <Icon className="w-12 h-12" />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
