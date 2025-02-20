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

    static actions = [
        {
            name: 'Авторизация middleware',
            value: 'AUTH_MIDDLEWARE'
        }, 
        {
            name: 'Дамп логов',
            value: 'DUMP_LOGS'
        }, 
        {
            name: 'Дамп сервисов',
            value: 'DUMP_SERVICES'
        }, 
        {
            name: 'Дамп настроек',
            value: 'DUMP_SETTINGS'
        }, 
        {
            name: 'Обновление режима аккаунтов',
            value: 'DURAK_ACCOUNTS_UPDATED_MODE'
        }, 
        {
            name: 'Генерация подписи',
            value: 'GENERATE_SIGNATURE'
        }, 
        {
            name: 'Очистка логов',
            value: 'LOGS_ERASED'
        }, 
        {
            name: 'Добавление прокси',
            value: 'PROXY_ADD'
        }, 
        {
            name: 'Добавление множества прокси',
            value: 'PROXY_ADDMANY'
        }, 
        {
            name: 'Удаление прокси',
            value: 'PROXY_DELETE'
        }, 
        {
            name: 'Отключение прокси',
            value: 'PROXY_DISABLE'
        }, 
        {
            name: 'Дамп прокси',
            value: 'PROXY_DUMP'
        }, 
        {
            name: 'Получение прокси',
            value: 'PROXY_GET'
        }, 
        {
            name: 'Обновление прокси',
            value: 'PROXY_REFRESHED'
        }, 
        {
            name: 'Обновление прокси',
            value: 'PROXY_UPDATE'
        }, 
        {
            name: 'Конфигурация системы',
            value: 'SYSTEM_CONFIGURED'
        }, 
        {
            name: 'Обновление настроек',
            value: 'UPDATE_SETTINGS'
        }, 
        {
            name: 'Авторизация пользователя',
            value: 'USER_AUTHORIZATION'
        }, 
        {
            name: 'Обновление токена пользователя',
            value: 'USER_REFRESH_TOKEN'
        }
    ];

    static actionsService = [
        {
            name: 'Добавление аккаунта',
            value: 'ACCOUNT_ADD'
        }, 
        {
            name: 'Удаление аккаунта',
            value: 'ACCOUNT_DELETE'
        }, 
        {
            name: 'Дамп аккаунта',
            value: 'ACCOUNT_DUMP'
        }, 
        {
            name: 'Получение аккаунта',
            value: 'ACCOUNT_GET'
        }, 
        {
            name: 'Обновление аккаунта',
            value: 'ACCOUNT_UPDATE'
        }, 
        {
            name: 'Очистка аккаунта',
            value: 'ACCOUNT_WIPE'
        }, 
        {
            name: 'Получение серверов',
            value: 'GET_SERVERS'
        }, 
        {
            name: 'Получение статистики',
            value: 'GET_STATS'
        }, 
        {
            name: 'Дамп логов сервиса',
            value: 'LOGS_SERVICE_DUMP'
        }, 
        {
            name: 'Дамп логов штрихов',
            value: 'LOGS_STREAKS_DUMP'
        }, 
        {
            name: 'Добавление штриха',
            value: 'STREAK_ADD'
        }, 
        {
            name: 'Добавление множества штрихов',
            value: 'STREAK_ADDMANY'
        }, 
        {
            name: 'Удаление штриха',
            value: 'STREAK_DELETE'
        }, 
        {
            name: 'Дамп штриха',
            value: 'STREAK_DUMP'
        }, 
        {
            name: 'Получение штриха',
            value: 'STREAK_GET'
        }, 
        {
            name: 'Перелинковка штриха',
            value: 'STREAK_RELINK'
        }, 
        {
            name: 'Обновление штриха',
            value: 'STREAK_UPDATE'
        }, 
        {
            name: 'Очистка штриха',
            value: 'STREAK_WIPE'
        }
    ];

    static actionsStreak = [
        {
            name: 'Авторизация бота',
            value: 'BOT_AUTH'
        }, 
        {
            name: 'Готовность бота',
            value: 'BOT_GAME_READY'
        }, 
        {
            name: 'Отказ от игры',
            value: 'BOT_SURRENDER'
        }, 
        {
            name: 'Создание игры',
            value: 'GAME_CREATE'
        }, 
        {
            name: 'Завершение игры',
            value: 'GAME_END'
        }, 
        {
            name: 'Инициализация игры',
            value: 'GAME_INIT'
        }, 
        {
            name: 'Игрок в игре',
            value: 'GAME_PLAYER'
        },
        {
            name: 'Начало игры',
            value: 'GAME_START'
        }, 
        {
            name: 'Остановка игры',
            value: 'GAME_STOP'
        }, 
        {
            name: 'Статус игры',
            value: 'GET_STATUS'
        }, 
        {
            name: 'Завершение раунда',
            value: 'ROUND_END'
        }, 
        {
            name: 'Перелинковка',
            value: 'STREAK_RELINK'
        }
    ];

    static types = [
        {
            name: 'Информация',
            value: 'INFO'
        }, 
        {
            name: 'Предупреждение',
            value: 'WARNING'
        }, 
        {
            name: 'Ошибка',
            value: 'ERROR'
        }, 
        {
            name: 'Отладка',
            value: 'DEBUG'
        }
    ];

    static orders = [
        {
            name: 'По возрастанию',
            value: 'ASC'
        },
        {
            name: 'По убыванию',
            value: 'DESC'
        }
    ];


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
