import type { ApiResponse } from "../../types/common";
import type { ZoneDto } from "../../types/zone";
import api from "../client";

export async function softDeleteZone(id: string) {
    const res = await api.patch<ApiResponse<ZoneDto[]>>(`/api/zones/${id}/soft-delete`, {});
    return res.data?.data ?? []
}