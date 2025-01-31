import type { LogActionSystem, LogSystem, LogType } from "~/types";

/** Модель лога
 * @param {LogActionSystem} action - Кодовое обозначение совершённого действия
 * @param {LogType}         type - Тип
 * @param {string}          message - Сообщение
 * @param {any}             meta - Мета-данные
 * @param {number}          created_at - Время создания
 */
export class Log {
    action: LogActionSystem;
    type: LogType;
    message: string;
    meta: any;
    created_at: number;

    /** Конструктор
     * 
     * @param {LogSystem} params - Фильтры при поиске логов 
     */
    constructor(params: LogSystem) {
        this.action = params.action;
        this.type = params.type;
        this.message = params.message;
        this.meta = params.meta;
        this.created_at = params.created_at;
    }

    static actions = {
        items: ['AUTH_MIDDLEWARE', 'DUMP_LOGS', 'DUMP_SERVICES', 'DUMP_SETTINGS', 'DURAK_ACCOUNTS_UPDATED_MODE', 'GENERATE_SIGNATURE', 'LOGS_ERASED', 'PROXY_ADD', 'PROXY_ADDMANY', 'PROXY_DELETE', 'PROXY_DISABLE', 'PROXY_DUMP', 'PROXY_GET', 'PROXY_REFRESHED', 'PROXY_UPDATE', 'SYSTEM_CONFIGURED', 'UPDATE_SETTINGS', 'USER_AUTHORIZATION', 'USER_REFRESH_TOKEN'],
        value: ''
    } 

    static actionsService = {
        items: ['ACCOUNT_ADD', 'ACCOUNT_DELETE', 'ACCOUNT_DUMP', 'ACCOUNT_GET', 'ACCOUNT_REFRESH', 'ACCOUNT_UPDATE', 'ACCOUNT_WIPE', 'GET_SERVERS', 'GET_STATS', 'LOGS_SERVICE_DUMP', 'LOGS_STREAKS_DUMP', 'STREAK_ADD', 'STREAK_ADDMANY', 'STREAK_DELETE', 'STREAK_DUMP', 'STREAK_GET', 'STREAK_RELINK', 'STREAK_UPDATE', 'STREAK_WIPE'],
        value: ''
    }

    static actionsStreak = {
        items: ['BOT_AUTH', 'BOT_GAME_READY', 'BOT_SURRENDER', 'GAME_CREATE', 'GAME_END', 'GAME_INIT', 'GAME_PLAYER', 'GAME_START', 'GAME_STOP', 'GET_STATUS', 'ROUND_END', 'STREAK_RELINK'],
        value: ''
    }

    static types = {
        items: ['INFO', 'WARNING', 'ERROR', 'DEBUG'],
        value: ''
    } 

    static orders = {
        items: ['ASC', 'DESC'],    
        value: ''
    } 

    /** Получение конвертированной даты из timestamp
     * 
     * @param {number} date 
     * @returns {string}
     */
    static getDate(date: number): string {
        return new Date(date * 1000).toLocaleDateString();
    }

    /** Получение конвертированных часов и минут из timestamp
     * 
     * @param {number} date 
     * @returns {string}
     */
    static getTime(date: number): string {
        let minutes: any = new Date(date * 1000).getMinutes();
        let hours: any = new Date(date * 1000).getHours();
        if (minutes < 10) 
            minutes = '0' + minutes;
        if (hours < 10) 
            hours = '0' + hours;

        return hours + ':' +  minutes;
    }
}
