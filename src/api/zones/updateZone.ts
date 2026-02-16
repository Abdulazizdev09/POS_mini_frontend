import type { ApiResponse } from "../../types/common";
import type { ZoneDto } from "../../types/zone";
import api from "../client";



export async function updateZone(
    id: string,
    body: { name: string; description: string }
) {
    const res = await api.patch<ApiResponse<ZoneDto>>(`/api/zones/${id}`, body)
    return res?.data?.data;
}