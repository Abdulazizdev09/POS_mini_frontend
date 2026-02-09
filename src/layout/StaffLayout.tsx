import { Outlet, Link } from "react-router-dom";

export default function StaffLayout() {
    return (
        <div className="h-screen flex flex-col">
            <header className="h-20 px-4 flex items-center justify-between border-b">
                <Link to="/orders" className="text-xl font-bold">Orders</Link>
                <Link to="/admin" className="px-5 py-3 border rounded-lg text-2xl bg-black text-white font-semibold">
                    Admin
                </Link>
            </header>

            <main className="flex-1 overflow-auto  p-4">
                <Outlet />
            </main>
        </div>
    );
}
