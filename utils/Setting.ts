import { SettingsAPI } from "~/api";
import { Tokens, type Setting } from "~/models";

export type SettingClientData = {
    new: Setting;
    old: any;
}

export async function initializeSettings(settings: SettingClientData, settingsApi: SettingsAPI, tokens: Tokens) {
    const response = await settingsApi.get({}, tokens.access_token);
    settings.new = response;
    settings.old = Object.keys(response).reduce((acc: any, categoryKey: string) => {
        acc[categoryKey] = response[categoryKey as keyof typeof response].reduce((acc: any, field: any) => {
            acc[field.key] = field.value;
            return acc;
        }, {});
        return acc;
    }, {});
}