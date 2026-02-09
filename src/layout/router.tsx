import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StaffLayout from "./StaffLayout";
import OrdersList from "../pages/staff/OrdersList";
import OrderDetails from "../pages/staff/OrderDetails";
import AdminLayout from "./AdminLayout";
import Zones from "../pages/admin/Zones";
import Tables from "../pages/admin/Tables";
import Devices from "../pages/admin/Devices";
import Categories from "../pages/admin/Categories";
import Items from "../pages/admin/Items";
import ModifierGroups from "../pages/admin/ModifierGroups";
import ModifierOptions from "../pages/admin/ModifierOptions";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../pages/admin/AdminDashboard";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                {/* default */}
                <Route path="/" element={<Navigate to="/orders" replace />} />

                {/* Staff */}
                <Route element={<StaffLayout />}>
                    <Route path="orders" element={<OrdersList />} />
                    <Route path="orders/:orderId" element={<OrderDetails />} />
                </Route>

                {/* Admin */}
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="zones" element={<Zones />} />
                    <Route path="tables" element={<Tables />} />
                    <Route path="devices" element={<Devices />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="items" element={<Items />} />
                    <Route path="modifier-groups" element={<ModifierGroups />} />
                    <Route path="modifier-options" element={<ModifierOptions />} />
                </Route>

                {/* fallBack */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}