import type { ApiResponse } from "../../types/common";
import type { DeviceDto } from "../../types/device";
import api from "../client";

export async function updateDevice(
    id: string,
    body: { name: string; tableId?: string | null }
) {
    const res = await api.patch<ApiResponse<DeviceDto>>(`/api/devices/${id}`, body)
    return res.data?.data;
}
