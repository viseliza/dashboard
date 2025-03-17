import { TemplateAPI } from "~/api";
import { Setting } from "~/models";
import type { ISettingAPI } from "~/types";


/** Класс для работы с разделом настроек из Pennoe API 
 * 
 * @property {string} access_token - Авторизационный токен
 * @method get {Function} - Получение всех настроек и их общее количество
 * @method update {Function} - Обновление настройки по ключу
 */
export class SettingsAPI extends TemplateAPI implements ISettingAPI {
    static METHOD = 'system/settings/';
    
    /** Инициализация класса
     * 
     * @param {string} x_token 
     * @param {string | undefined} token 
     */
    constructor(x_token: string, token?: string) {
        super(x_token);
    }

    
    /** Получение списка настроек
    *
    * @param {any} params  
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Модели настроек и общее их количество
    */
    async get(params: any, access_token: string): Promise<any> {
        return await super.callApi(SettingsAPI.METHOD, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }, "GET");
    }


    /** Обновление параметра настроек
    *
    * @param {any} body - Ключ изменяемой настройки и его новое значение 
    * @param {string} access_token - Настоящий access_token
    * @returns - Модель обновленных настроек
    */
    async update(body: any, access_token: string) {
        return new Setting(
            await super.callApi(SettingsAPI.METHOD, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                body
            }, "PATCH")
        );
    }
}