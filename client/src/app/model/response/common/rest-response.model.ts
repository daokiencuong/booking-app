export interface RestResponse<T> {
    status: number;
    message: string;
    error: any;
    data: T;
}