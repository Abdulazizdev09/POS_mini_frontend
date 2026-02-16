import type { ApiResponse } from "../../types/common";
import type { MenuCategoryDto } from "../../types/menu";
import api from "../client";



export async function getCategories() {
    const res = await api.get<ApiResponse<MenuCategoryDto[]>>("/api/menu-categories")
    return res?.data?.data ?? []
}