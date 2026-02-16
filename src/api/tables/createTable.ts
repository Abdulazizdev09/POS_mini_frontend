import type { ApiResponse } from "../../types/common";
import type { TableDto } from "../../types/tables";
import api from "../client";



const shape = "SQUARE"


export async function createTable(body: { name: string; capacity: number; zoneId: string; }) {
    const resBody = {
        ...body, shape
    }

    const res = await api.post<ApiResponse<TableDto>>("/api/tables", resBody)
    return res.data?.data;
}