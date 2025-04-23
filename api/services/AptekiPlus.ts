import { TemplateAPI } from "~/api";
import { AptekiPlusAccount, AptekiPlusAccountCreate, AptekiPlusAccountWipe, Log, Statistic } from "~/models";
import type { RequestResult } from "~/types";

export class AptekiPlusAPI extends TemplateAPI {
    /*****************************/
    /* * * К О Н С Т А Н Т Ы * * */
    /*****************************/

    static accountsMethod  = 'services/aptekiplus/private/accounts/';
    static logsMethod      = 'services/aptekiplus/private/logs/';
    static serversMethod   = 'services/aptekiplus/public/servers/';
    static requestsMethod  = 'services/aptekiplus/private/requests/';
    static statsMethod     = 'services/aptekiplus/private/stats/';

    constructor(x_token: string) {
        super(x_token)
    }


    /***************************/
    /* * * A C C O U N T S * * */
    /***************************/

    /** Добавление аккаунта AptekiPlus
    *
    * @param {object} body - Данные для создания аккаунта 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Account>} - Созданная модель аккаунта
    */
    async createAccount(body: AptekiPlusAccountCreate, access_token: string) {
        const account = await super.callApi(AptekiPlusAPI.accountsMethod + 'add', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "POST");
        return new AptekiPlusAccount(account);
    }

    /** Дамп аккаунтов AptekiPlus в диапазоне 
    *
    * @param {any} params - Диапазон выборки аккаунтов 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Найденные модели аккаунтов в диапазоне
    */
    async dumpAccounts(params: any, access_token: string) {
        const { data, count } = await super.callApi(AptekiPlusAPI.accountsMethod + 'dump', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts: { ...params }
        });
        return {
            data: data.map((account: AptekiPlusAccount) => new AptekiPlusAccount(account)),
            count
        };
    }


    /** Обновление информации аккаунта AptekiPlus по его Id  
    *
    * @param {string} id - Id аккаунта для поиска 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<AptekiPlusAccount>} - Найденная модель аккаунта
    */
    async refreshAccount(id: string, access_token: string): Promise<AptekiPlusAccount> {
        const account = await super.callApi(AptekiPlusAPI.accountsMethod + `refresh/${id}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return new AptekiPlusAccount(account);
    }

    
    /** Удаление аккаунта AptekiPlus по Id
    *
    * @param {string} id - Id аккаунта для удаления 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<AptekiPlusAccount>} - Модель удаленного аккаунта
    */
    async deleteAccount(id: string, access_token: string): Promise<AptekiPlusAccount> {
        const account = await super.callApi(AptekiPlusAPI.accountsMethod + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
        }, "DELETE");
        return new AptekiPlusAccount(account);
    }
    
    
    /** Удаление всех аккаунтов AptekiPlus
    *
    * @param {any} opts - Данные для подтверждения удаления всех аккаунтов 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<AptekiPlusAccountWipe>} - Статус завершения операции
    */
    async wipeAccounts(opts: any, access_token: string): Promise<AptekiPlusAccountWipe> {
        return await super.callApi(AptekiPlusAPI.accountsMethod + 'wipe', {
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
    async getStats(params: any, access_token: string): Promise<Statistic> {
        const statistic = await super.callApi(AptekiPlusAPI.statsMethod, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return new Statistic(statistic);
    }


    /***********************/
    /* * R E Q U E S T S * */
    /***********************/

    
    /** Получение баланса и счета карты с аккаунта AptekiPlus по Id
    *
    * @param {string} id - Id аккаунта для удаления 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<RequestResult>} - Модель удаленного аккаунта
    */
    async getBalance(id: string, access_token: string): Promise<RequestResult> {
        return super.callApi(AptekiPlusAPI.accountsMethod + id + '/balance', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
        });
    }

    
    /** Получение профиля аккаунта AptekiPlus по Id
    *
    * @param {string} id - Id аккаунта для удаления 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<RequestResult>} - Модель удаленного аккаунта
    */
    async getProfile(id: string, access_token: string): Promise<RequestResult> {
        return super.callApi(AptekiPlusAPI.accountsMethod + id + '/profile', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
        });
    }

    
    /** Получение истории операций с балансом аккаунта AptekiPlus по Id
    *
    * @param {object} data - Данные для поиска 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<RequestResult>} - Модель удаленного аккаунта
    */
    async getBalanceHistory(data: { id: string, params: any }, access_token: string): Promise<RequestResult> {
        const { id, params } = data;
        return super.callApi(AptekiPlusAPI.accountsMethod + id + '/balance-history', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts: { ...params }
        });
    }


    /***********************/
    /* * * * L O G S * * * */
    /***********************/
    
    /** Получение логов по сервису
    *
    * @param {any} params - Параметры для фильтрации и поиска логов 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Модели найденных логов и общее количество
    */
    async getServiceLogs(params: any, access_token: string) {
        return super.callApi(AptekiPlusAPI.logsMethod + 'service', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts: {
                ...params
            }
        }, "GET");
    }


    /** Получение логов по штриху
    *
    * @param {any} _data - Id штриха и параметры для фильтрации и поиска логов 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Модели найденных логов и общее количество
    */
    async getStreakLogs(_data: any, access_token: string) {
        const { id, params } = _data;
        return super.callApi(AptekiPlusAPI.logsMethod + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts: {
                ...params
            }
        }, "GET");
    }
}