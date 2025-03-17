import { TemplateAPI } from "~/api";
import { 
    Streak, 
    Account,
    Statistic,
    Server,
    Log
} from "~/models";


export class DurakAPI extends TemplateAPI {
    /*****************************/
    /* * * К О Н С Т А Н Т Ы * * */
    /*****************************/

    static streaksMethod   = 'services/durak/private/streaks/';
    static accountsMethod  = 'services/durak/private/accounts/';
    static statsMethod     = 'services/durak/private/stats/';
    static logsMethod      = 'services/durak/private/logs/';
    static serversMethod   = 'services/durak/public/servers/';


    constructor(x_token: string) {
        super(x_token)
    }

    /*****************************/
    /* * * * S T R E A K S * * * */
    /*****************************/
    
    /** Создание одного штриха
    *
    * @param {object} body - Данные создания штриха
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Streak>} - Id и баллы созданного штриха
    */
    async createStreak(body: any, access_token: string) {
        const streak = await super.callApi(DurakAPI.streaksMethod + 'add', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "POST");
        return new Streak(streak);
    }
    
    
    /** Создание нескольких штрихов
    *
    * @param {object} body - Данные создания штрихов
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Streak[]>} - Модели созданных штрихов
    */
    async createManyStreak(body: any, access_token: string) {
        const streaks = await super.callApi(DurakAPI.streaksMethod + 'addMany', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "POST");
        return streaks.data.map((streak: any) => new Streak({
            id: streak,
            points: streaks.points
        }));
    }
    
    
    /** Дамп 25 штрихов по условию
    *
    * @param {object} params - Начало и конец поиска штрихов
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Streak[]>} - Модели штрихов и их количество
    */
    async dumpStreaks(params: any, access_token: string) {
        const { data, count } = await super.callApi(DurakAPI.streaksMethod + 'dump', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts: {
                ...params
            }
        });
        return {
            data: data.map((streak: any) => new Streak(streak)),
            count
        }
    }
    
    
    /** Обновление очков штриха по Id
    *
    * @param {any} data - Данные для обновленения штриха 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Streak>} - Обновленная модель штриха
    */
    async updateStreak(data: any, access_token: string) {
        const { id, points } = data;
        const streak = await super.callApi(DurakAPI.streaksMethod + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body: { points }
        }, "PATCH");
        return new Streak(streak);
    }
    
    
    /** Удаление штриха по Id
    *
    * @param {string} id - Данные для обновленения штриха 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Streak>} - Обновленная модель штриха
    */
    async deleteStreak(id: string, access_token: string) {
        const streak = await super.callApi(DurakAPI.streaksMethod + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
        }, "DELETE");
        return new Streak(streak);
    }
    
    
    /** Удаление всех штрихов
    *
    * @param {any} opts - Данные для подтверждения удаления всех штрихов 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Статус завершения операции
    */
    async wipeStreaks(opts: any, access_token: string) {
        return await super.callApi(DurakAPI.streaksMethod + 'wipe', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts
        }, "DELETE");
    }


    /** Обновление штрихов по Id
    *
    * @param {any} id - Id штриха для обновления 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Streak>} - Обновленная модель штриха
    */
    async relinkStreaks(id: string, access_token: string): Promise<Streak> {
        const streak = await super.callApi(DurakAPI.streaksMethod + id + '/relink', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }, 'PATCH');
        return new Streak(streak);
    }



    /***************************/
    /* * * A C C O U N T S * * */
    /***************************/

    /** Добавление аккаунта Дурака
    *
    * @param {object} body - Данные для создания аккаунта 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Account>} - Созданная модель аккаунта
    */
    async createAccount(body: any, access_token: string) {
        const account = await super.callApi(DurakAPI.accountsMethod + 'add', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "POST");
        return new Account(account);
    }


    /** Дамп аккаунтов Дурака в диапазоне 
    *
    * @param {any} params - Диапазон выборки аккаунтов 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Найденные модели аккаунтов в диапазоне
    */
    async dumpAccounts(params: any, access_token: string) {
        const { data, count } = await super.callApi(DurakAPI.accountsMethod + 'dump', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts: { ...params }
        });
        return {
            data: data.map((account: Account) => new Account(account)),
            count
        };
    }


    /** Обновление информации аккаунта Дурака по его Id  
    *
    * @param {string} id - Id аккаунта для поиска 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Account>} - Найденная модель аккаунта
    */
    async refreshAccount(id: string, access_token: string) {
        const account = await super.callApi(DurakAPI.accountsMethod + `refresh/${id}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return new Account(account);
    }
    
    
    /** Обновление мода аккаунта Дурака по его Id
    *
    * @param {any} data - Данные для обновленения аккаунта 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Account>} - Обновленная модель аккаунта
    */
    async updateAccount(data: any, access_token: string) {
        const { id, mode } = data;
        const account = await super.callApi(DurakAPI.accountsMethod + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body: { mode }
        }, "PATCH");
        return new Account(account);
    }
    
    
    /** Удаление аккаунта Дурака по Id
    *
    * @param {string} id - Id аккаунта для удаления 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Account>} - Модель удаленного аккаунта
    */
    async deleteAccount(id: string, access_token: string) {
        const account = await super.callApi(DurakAPI.accountsMethod + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
        }, "DELETE");
        return new Account(account);
    }
    
    
    /** Удаление всех аккаунтов Дурака
    *
    * @param {any} opts - Данные для подтверждения удаления всех аккаунтов 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Статус завершения операции
    */
    async wipeAccounts(opts: any, access_token: string) {
        return await super.callApi(DurakAPI.accountsMethod + 'wipe', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts
        }, "DELETE");
    }



    /*************************/
    /* * * * S T A T S * * * */
    /*************************/

    /** Получение статистики по сервису Дурака  
    *
    * @param {string} params - Опциональные параметры
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Statistic>} - Модель статистики по сервису
    */
    async getStats(params: any, access_token: string) {
        const statistic = await super.callApi(DurakAPI.statsMethod, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return new Statistic(statistic);
    }



    /*************************/
    /* * * S E R V E R S * * */
    /*************************/

    /** Получение статистики по сервису Дурака  
    *
    * @returns {Promise<any>} - Модель статистики по сервису
    */
    async getServers() {
        const server = await super.callApi(DurakAPI.statsMethod);
        return new Server(server);
    }



    /***************************/
    /* * * * * L O G S * * * * */
    /***************************/

    /** Получение логов по сервису
    *
    * @param {any} params - Параметры для фильтрации и поиска логов 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Модели найденных логов и общее количество
    */
    async getServiceLogs(params: any, access_token: string) {
        const { data, count } = await super.callApi(DurakAPI.logsMethod + 'service', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts: {
                ...params
            }
        }, "GET");
        return {
            data: data.map((log: Log) => new Log(log)),
            count
        }
    }


    /** Получение логов по штриху
    *
    * @param {any} _data - Id штриха и параметры для фильтрации и поиска логов 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Модели найденных логов и общее количество
    */
    async getStreakLogs(_data: any, access_token: string) {
        const { id, params } = _data;
        const { data, count } = await super.callApi(DurakAPI.logsMethod + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts: {
                ...params
            }
        }, "GET");
        return {
            data: data.map((log: Log) => new Log(log)),
            count
        }
    }
}