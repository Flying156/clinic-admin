export interface Result<T> {
    data: T;
    message: string;
    code: number;
}