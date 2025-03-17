import type { AptekiPlusAccount } from "~/models";

export type AptekiPlusAccountFields = {
    id: string;
    login: string;
    password: string;
    token: string;
    device_id: string;
    region_id: number;
    barcode: string;
    balance: number;
    opened: boolean;
    opened_at: number;
    rechecked_at: number;
    created_at: number;
    updated_at: number;
}

export type AptekiPlusAccountCreateFields = {
    login: string;
    password: string;
}

export type AptekiPlusAccountInfoFields = {
    balance: number;
    barcode: string;
    phone: string;
}

export type AptekiPlusAccountDumpFields = {
    data: AptekiPlusAccount[];
    count: number;
}