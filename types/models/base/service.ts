import type { ServiceItem } from "~/models";

export interface IServiceItem {
    code: string;
    name: string;
}

export interface IServices {
    data: Array<ServiceItem>;
}