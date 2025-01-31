import type { 
    LogActionService,
    LogActionStreak,
    LogActionSystem,
    LogDump,
    LogType,
    LogOrder
} from "~/types";

export interface ILogsAPI {
    dump(params: LogDumpParams, access_token: string): Promise<LogDump>
}

export type LogDumpParams = {
    id?: string;
    action?: LogActionSystem | LogActionService | LogActionStreak;
    log_type?: LogType;
    from_timestamp?: number;
    to_timestamp?: number;
    order?: LogOrder;
    limit: number;
    offset: number;
}