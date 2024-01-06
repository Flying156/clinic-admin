import {Dayjs} from "dayjs";

export interface Drug {
    id: number;
    quantity: number;
    price: number;
    effect: string;
    manufacturer: string;
    createTime: Date;
    updateTime: Date;
    produceTime: Dayjs;
    expireTime: Dayjs;
    name: string;
}