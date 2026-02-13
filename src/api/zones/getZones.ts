import type { ApiResponse } from "../../types/common";
import type { ZoneDto } from "../../types/zone";
import api from "../client";

export async function getZones() {
    const res = await api.get<ApiResponse<ZoneDto[]>>("/api/zones");
    return res?.data?.data ?? []

}