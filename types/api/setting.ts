import type { Setting } from "~/models";
import type { SettingKeys } from "~/types";

export type SettingsDump = {
    data: Array<Setting>;
    count: number;
}

export type SettingUpdate = {
    key: SettingKeys;
    value: string | number;
}

export interface ISettingAPI {
    get(params: any, access_token: string): Promise<SettingsDump>;
    update(body: SettingUpdate, access_token: string): Promise<Setting>;
}