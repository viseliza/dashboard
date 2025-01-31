import { TemplateAPI } from "~/api";
import { Log } from "~/models";
import type { DumpData, ILogsAPI } from "~/types";


/** Класс для работы с разделом логов из Pennoe API 
 * 
 * @property {string} access_token - Авторизационный токен
 * @method dump - Получение логов с соответствующими фильтрами и диапазоне
 */
export class LogsAPI extends TemplateAPI implements ILogsAPI {
    access_token;
    
    constructor(token: string, x_token: string) {
        super(x_token);
        this.access_token = token;
    }

    
    /** Получение списка логов в диапазоне
    *
    * @param {any} params - Параметры для фильтрации и поиска логов 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Модели найденных логов и общее количество
    */
    async dump(params: any, access_token: string): Promise<DumpData<Log>> {
        const { data, count } = await super.callApi('system/logs', {
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