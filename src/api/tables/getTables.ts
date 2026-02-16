import type { ApiResponse } from "../../types/common";
import type { TableDto } from "../../types/tables";
import api from "../client";



export async function getTables() {
    const res = await api.get<ApiResponse<TableDto[]>>("/api/tables")
    return res?.data?.data ?? []
}