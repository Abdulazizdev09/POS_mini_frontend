import type { TableDto } from "./tables";

export interface ZoneDto {
    readonly id: string;
    readonly venueId: string;
    name: string;
    description: string;
    color: string;
    sortOrder: number;
    isActive: boolean;
    isDeleted: boolean;
    tables?: TableDto[];
    createdAt: string | Date;
    updatedAt: string | Date;
}