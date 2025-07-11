export interface ApiResponse<T> {
    status: number;
    error: any;
    message: string;
    data: T;
}