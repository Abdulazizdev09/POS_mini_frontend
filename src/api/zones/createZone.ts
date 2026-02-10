import type { ApiResponse } from "../../types/common";
import type { ZoneDto } from "../../types/zone";
import api from "../client";

export async function createZone(body: { name: string; description: string }) {
    const res = await api.post<ApiResponse<ZoneDto>>("/api/zones", body);
    return res.data?.data;
}
