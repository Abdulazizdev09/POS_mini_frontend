import type { ApiResponse } from "../../types/common";
import type { TableDto } from "../../types/tables";
import api from "../client";

export async function softDeleteTable(id: string) {
    const res = await api.patch<ApiResponse<TableDto[]>>(`/api/tables/${id}/soft-delete`,{})
    return res.data?.data ?? [];
}