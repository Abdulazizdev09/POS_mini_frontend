import { ArrowLeft } from "lucide-react"
import { Outlet, useNavigate } from "react-router-dom"

function AdminLayout() {
    const navigate = useNavigate()
    return (
        <div className="h-screen flex flex-col">
            <header className="h-20 px-4 flex items-center justify-between border-b">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate("/orders")}
                        className="bg-black text-white cursor-pointer p-2 rounded-lg">
                        <ArrowLeft className="w-10 h-10" />
                    </button>
                    <h1 className="text-2xl font-extrabold">Admin</h1>
                </div>
            </header>
            <main className="flex-1 overflow-auto  p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout