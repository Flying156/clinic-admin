import axios from 'axios';
import type {AxiosResponse, AxiosError} from 'axios'

const axiosInstance = axios.create({
    baseURL : '',
    timeout : 5000,
    headers : {
        'Content-Type' : "application/json; charset=utf-8"
    }
});
// axiosInstance.interceptors.request.use(
//     (config: AxiosRequestConfig) => {
//         return config;
//     },
//     (error: AxiosError) => {
//         console.log(error, 'e');
//     });

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data.code == 200)
            return response;
        else {
        }
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    });

interface ApiResult<T> {
    data: T;
    code: number;
    message: string;
    flag: boolean;
}

export async function get<T>(url: string, params?: any): Promise<ApiResult<T>>
{
    const response = await axiosInstance.get<ApiResult<T>>(url, { params });
    return response.data;
}

export async function post<T>(url: string, params?: any, config?: any): Promise<ApiResult<T>>
{
    const response = await axiosInstance.post<ApiResult<T>>(url, params, config);
    return response.data;
}

export async function put<T>(url: string, params?: any): Promise<ApiResult<T>>
{
    const response = await axiosInstance.put<ApiResult<T>>(url, params);
    return response.data;
}

export async function del<T>(url: string, params?: any): Promise<ApiResult<T>>
{
    const response = await axiosInstance.delete<ApiResult<T>>(url, { params });
    return response.data;
}
