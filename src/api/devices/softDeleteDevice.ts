import type { ApiResponse } from "../../types/common";
import type { DeviceDto } from "../../types/device";
import api from "../client";

export async function softDeleteDevice(id: string) {
    const res = await api.patch<ApiResponse<DeviceDto>>(`/api/devices/${id}/soft-delete`, {})
    return res.data?.data;
}
