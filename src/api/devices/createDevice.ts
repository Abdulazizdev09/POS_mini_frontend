import type { ApiResponse } from "../../types/common";
import type { DeviceDto } from "../../types/device";
import api from "../client";

export async function createDevice(body: { name: string; tableId?: string }) {
    const res = await api.post<ApiResponse<DeviceDto>>("/api/devices", body)
    return res.data?.data;
}
