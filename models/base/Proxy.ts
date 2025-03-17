import type { ProxyAuth, ProxyMode, ProxyParams, ProxyType, ProxyUpdate } from "~/types";

/** Модель прокси
 * @param {string}      id - Id прокси
 * @param {string}      host - Хост прокси
 * @param {number}      port - Порт
 * @param {ProxyAuth}   auth - Настройка авторизации
 * @param {ProxyUpdate} update - Настройка обновления
 * @param {ProxyType}   type - Тип
 * @param {ProxyMode}   mode - Режим работы
 * @param {boolean}     checkInternet - Проверять интернет перед отправкой запроса или нет
 * @param {boolean}     enable - Включена ли прокси
 * @param {number}      created_at - Дата создания
 * @param {number}      updated_at - Дата последнего обновления
 */
export class Proxy {
    id: string;
    host: string;
    port: number;
    auth: ProxyAuth;
    update: ProxyUpdate;
    type: ProxyType;
    mode: ProxyMode;
    checkInternet: boolean;
    enable: boolean;
    created_at: number;
    updated_at: number;

    /** Конструктор
     * 
     * @param {ProxyParams} params 
     */
    constructor(params: ProxyParams) {
        this.id = params.id;
        this.host = params.host;
        this.port = params.port;
        this.auth = params.auth;
        this.update = params.update;
        this.type = params.type;
        this.mode = params.mode;
        this.checkInternet = params.checkInternet;
        this.enable = params.enable;
        this.created_at = params.created_at;
        this.updated_at = params.updated_at;
    }

    static baseParams = {
        host: {
            type: 'string',
            example: '1.1.1.1',
            required: true,
        },
        port: {
            type: 'number',
            example: 8080,
            required: true,
        },
        type: {
            type:  ['http', 'https', 'socks4', 'socks5'],
            example: 'socks5',
            required: true,
        },
        mode: {
            type:  ['streaks', 'refresher', 'concurrent_requests'],
            example: 'streaks',
            required: true,
        },
        checkInternet: {
            type: [true, false],
            example: true,
            required: true,
        },
        enable: {
            type: [true, false],
            example: true,
            required: true,
        },
        auth: {
            enable: {
                type: [true, false],
                example: true,
                required: true,
            },
            username: {
                type: 'string',
                example: 'login',
                required: false,
            },
            password: {
                type: 'string',
                example: 'password',
                required: false,
            },
        },
        update: {
            enable: {
                type: [true, false],
                example: true,
                required: true,
            },
            link: {
                type: 'string',
                example: 'https://update.link/here',
                required: false,
            },
            seconds: {
                type: 'number',
                example: 120,
                required: false,
            }
        }
    };

    static manyParams = {
        format: {
            type: ['HOST:PORT', 'HOST:PORT:USER:PASS', 'HOST:PORT:USER:PASS:REFRESH_LINK:UPDATE_TIME'],
            example: 'HOST:PORT'
        },
        data: {
            type: 'textarea',
            example: 'HOST:PORT'
        },
        type: {
            type:  ['http', 'https', 'socks4', 'socks5'],
            example: 'socks5'

        },
        mode: {
            type:  ['streaks', 'refresher', 'concurrent_requests'],
            example: 'streaks'
        }
    };

    static exportParams = {
        extension: {
            type: ['.txt', '.json'],
            example: '.txt'
        },
        template: {
            type: 'string',
            example: '{type}:[{host}:{port}]/{update_link}'
        }
    };
}
