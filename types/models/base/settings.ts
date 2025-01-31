export interface ISetting {
    title: string;
    key: SettingKeys;
    value?: string | number;
    type: string;
    secret: boolean
}

export type SettingKeys = "USER_LOGIN" | "USER_PASSWORD" | "LOGS_ERASE_DAYS_SYSTEM" | "LOGS_ERASE_DAYS_SERVICE" | "LOGS_ERASE_DAYS_STREAK" | "DURAK_BALANCE_LIMIT_TO_UPDATE_MODE" | "DURAK_ACCOUNTS_MAIN_LIMIT";
