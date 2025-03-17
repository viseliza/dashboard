export type AptekiPlusLogActionService = "ACCOUNT_ADD" | "ACCOUNT_DELETE" | "ACCOUNT_DUMP" | "ACCOUNT_GET" | "ACCOUNT_REFRESH" | "ACCOUNT_WIPE" | "ACCOUNT_DIE" | "ACCOUNT_REQUEST_BALANCE" | "ACCOUNT_REQUEST_PROFILE" | "ACCOUNT_REQUEST_HISTORY" | "GET_STATS" | "LOGS_SERVICE_DUMP" | "LOGS_ACCOUNT_DUMP";

export type AptekiPlusLogActionStreak = "STREAK_OPENED" | "STREAK_RELINK" | "STREAK_BALANCE_CHANGED";

export type AptekiPlusLogDumpFields = {
    data: AptekiPlusLogFields[];
    count: number;
}

export type AptekiPlusLogOrder = 'DESC' | 'ASC';

export type AptekiPlusLogType = "info" | "warning" | "error" | "debug";

export type AptekiPlusLogFields = {
    action: AptekiPlusLogActionService | AptekiPlusLogActionStreak;
    type: AptekiPlusLogType;
    message: string;
    meta: any;
    created_at: number;
}
