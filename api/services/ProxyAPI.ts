import { TemplateAPI } from "~/api";
import { Proxy } from '~/models';
import type { IProxyAPI, Wipe } from "~/types";


/** Класс для работы с разделом проксей из Pennoe API 
 * 
 * @property {string} access_token - Авторизационный токен
 * @method create {Function} - Создание прокси
 * @method createMany {Function} - Создание нескольких прокси
 * @method dump {Function} - Выборка прокси в диапазоне
 * @method get {Function} - Выборка определенной прокси по её Id
 * @method update {Function} - Обновление прокси по ее Id
 * @method delete {Function} - Удаление прокси по ее Id
 * @method wipe {Function} - Удаление всех проксей
 */
export class ProxyAPI extends TemplateAPI implements IProxyAPI {
    static METHOD = 'system/proxies/';

    /** Инициализация класса
     * 
     * @param {string} token 
     * @param {string} x_token 
     */
    constructor(x_token: string, token?: string) {
        super(x_token);
    }

    /** Добавление прокси
    *
    * @param {any} body - Данные для создания прокси 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Proxy>} - Модель созданной прокси
    */
    async create(body: any, access_token: string) {
        const response = await super.callApi(ProxyAPI.METHOD + 'add', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "POST");
        return new Proxy(response);
    }


    /** Создание нескольких прокси
    *
    * @param {any} body - Данные для создания прокси 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Модель созданной прокси
    */
    async createMany(body: any, access_token: string) {
        const response = await super.callApi(ProxyAPI.METHOD + 'addMany', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "POST");
        return {
            data: response.data.map((proxy: Proxy) => new Proxy(proxy)),
            count: response.count
        };
    }


    /** Получение списка прокси в диапазоне
    *
    * @param {any} params - Диапазон для поиска проксей 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Модели найденных прокси и общее количество
    */
    async dump(params: any, access_token: string) {
        const { data, count } = await super.callApi(ProxyAPI.METHOD + 'dump', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts: {
                ...params
            }
        }, "GET");
        return {
            data: data.map((proxy: Proxy) => new Proxy(proxy)),
            count
        }
    }


    /** Получение информации о прокси
    *
    * @param {string} id - Id прокси для поиска 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Proxy>} - Модель найденной прокси
    */
    async get(id: string, access_token: string) {
        const response = await super.callApi(ProxyAPI.METHOD + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }, "GET");
        return new Proxy(response);
    }


    /** Обновление прокси по его Id
    *
    * @param {{ id: string, body}} data - Id прокси и данные для обновления 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Proxy>} - Модель обновленной прокси
    */
    async update(data: { id: string, body: any }, access_token: string) {
        const { id, body } = data;
        const response = await super.callApi(ProxyAPI.METHOD + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "PUT");
        return new Proxy(response);
    }


    /** Удаление прокси по его Id
    *
    * @param {string} id - Id прокси для удаления 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Proxy>} - Модель удаленной прокси
    */
    async delete(id: string, access_token: string) {
        const response = await super.callApi(ProxyAPI.METHOD + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }, "DELETE");
        return new Proxy(response);
    }


    /** Удаление всех прокси
    *
    * @param {any} opts - Данные для подтверждения удаления всех прокси 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<any>} - Статус ответа
    */
    async wipe(opts: Wipe, access_token: string) {
        const response = await super.callApi(ProxyAPI.METHOD + 'wipe', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            opts
        });
        return response;
    }
}