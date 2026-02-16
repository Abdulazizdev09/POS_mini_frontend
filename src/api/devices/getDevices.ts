import type { ApiResponse } from "../../types/common";
import type { DeviceDto } from "../../types/device";
import api from "../client";


export async function getDevices() {
    const res = await api.get<ApiResponse<DeviceDto[]>>("/api/devices?includeTables=true&limit=100")
    return res?.data?.data ?? [];
}