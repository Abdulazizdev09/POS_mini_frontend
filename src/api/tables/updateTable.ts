import type { ApiResponse } from "../../types/common";
import type { TableDto } from "../../types/tables";
import api from "../client";



export async function updateTable(
    id: string,
    body: { name: string, capacity: number, zoneId: string }
) {
    const res = await api.patch<ApiResponse<TableDto>>(`/api/tables/${id}`, body)
    return res?.data?.data ?? []
}

