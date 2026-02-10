export interface Meta {
    readonly total: number;
    readonly page: number;
    readonly limit: number;
    readonly totalPages: number;
    readonly hasNextPage: boolean;
    readonly hasPreviousPage: boolean;
}

export interface ApiResponse<T> {
    data: T;
    success?: boolean;
    message?: string;
    meta?: Meta;
}
