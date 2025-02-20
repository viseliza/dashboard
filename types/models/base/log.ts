export type LogActionSystem = 'AUTH_MIDDLEWARE' | 'DUMP_LOGS' | 'DUMP_SERVICES' | 'DUMP_SETTINGS' | 'DURAK_ACCOUNTS_UPDATED_MODE' | 'GENERATE_SIGNATURE' | 'LOGS_ERASED' | 'PROXY_ADD' | 'PROXY_ADDMANY' | 'PROXY_DELETE' | 'PROXY_DISABLE' | 'PROXY_DUMP' | 'PROXY_GET' | 'PROXY_REFRESHED' | 'PROXY_UPDATE' | 'SYSTEM_CONFIGURED' | 'UPDATE_SETTINGS' | 'USER_AUTHORIZATION' | 'USER_REFRESH_TOKEN';
export type LogActionService = 'ACCOUNT_ADD' | 'ACCOUNT_DELETE' | 'ACCOUNT_DUMP' | 'ACCOUNT_GET' | 'ACCOUNT_REFRESH' | 'ACCOUNT_UPDATE' | 'ACCOUNT_WIPE' | 'GET_SERVERS' | 'GET_STATS' | 'LOGS_SERVICE_DUMP' | 'LOGS_STREAKS_DUMP' | 'STREAK_ADD' | 'STREAK_ADDMANY' | 'STREAK_DELETE' | 'STREAK_DUMP' | 'STREAK_GET' | 'STREAK_RELINK' | 'STREAK_UPDATE' | 'STREAK_WIPE';
export type LogActionStreak = 'BOT_AUTH' | 'BOT_GAME_READY' | 'BOT_SURRENDER' | 'GAME_CREATE' | 'GAME_END' | 'GAME_INIT' | 'GAME_PLAYER' | 'GAME_START' | 'GAME_STOP' | 'GET_STATUS' | 'ROUND_END' | 'STREAK_RELINK'

export type LogOrder = 'ASC' | 'DESC';

export type LogType = 'info' | 'warning' | 'error' | 'debug';

export type LogDump = {
    data: Array<LogSystem>;
    count: number;
}


export type LogSystem = {
    action: LogActionSystem;
    type: LogType;
    message: string;
    meta: any;
    created_at: number;
}
