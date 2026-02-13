export interface TableDto {
    readonly id: string;
    
    readonly zoneId: string;
    name: string;
    capacity: number;
    posX?: number;
    posY?: number;
    shape: TableShape;
    status: TableStatus;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export type TableShape = 'SQUARE' | 'RECTANGLE' | 'ROUND'
export type TableStatus = "AVAILABLE" | "OCCUPIED" | "RESERVED" | "MAINTENANCE" 
