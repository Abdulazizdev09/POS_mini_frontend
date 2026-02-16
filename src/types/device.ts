import type { TableDto } from "./tables";


export interface DeviceDto {
    readonly id: string;
    readonly venueId: string;
    readonly tableId?: string;

    name: string;
    serialNumber: string;
    deviceType: DeviceType;
    deviceStatus: DeviceStatus;
    appVersion?: string;
    osVersion?: string;
    batteryLevel?: number;
    lastSeenAt?: string | Date;
    activatedAt?: string | Date;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
    table: TableDto;
}

export type DeviceType = "TERMINAL" | "TABLET" | "PRINTER" | "KDS"
export type DeviceStatus = "PENDING_ACTIVATION" | "ONLINE" | "OFFLINE" | "MAINTENANCE"