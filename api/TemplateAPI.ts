import type { TokensParams } from '~/types/api/base.js';
import { AppError } from './Error.js';
import { Tokens } from '@/models';

export class TemplateAPI {
    static x_token: string;
    static API = new URL('https://pennoe.org/api');

    /** Инициализация основного класса
     * 
     * @param {string} x_token 
     */
    constructor(x_token: string) {
        TemplateAPI.x_token = x_token;
    }


    /** Контроллер для вызова запроса на серверной части приложения 
     * 
     * @param {string} method - путь запроса из сервера
     * @param {any} params - параметры для вызова запроса 
     * @param {string} call - HTTP метод 
     * @returns - ответ с запроса
     */
    async callApi(method: string, params: any = {}, call: string = "GET") {
        const q = new URLSearchParams({
            ...params.opts
        });
                
        let url = `${TemplateAPI.API.origin}/api/${method}${q.toString() ? `?${q}` : ''}`;
        let response;

        params.headers 
        ? params.headers['Content-Type'] = 'application/json;charset=utf-8' 
        : params.headers = { 'Content-Type': 'application/json;charset=utf-8' };

        // params.headers['x-token'] = process.env.REQUEST_X_TOKEN;
        params.headers['x-token'] = TemplateAPI.x_token;

        /** @type {any} */
        const init: RequestInit = {
            method: call,
            headers: params.headers
        }
        
        if (params.body)
            init.body = JSON.stringify(params.body);
        
        response = await fetch(url, init);
        const json = await response.json();

        if (!json['detail']) {
            delete json.msg;
            delete json.code;
            return json;
        }
        
        AppError.check(json, response);

        throw new AppError(json.detail, json.msg, response.status);
    }


    /** Контроллер для работы с приватными запросами
     * 
     * @param {Function} callback - Приватная функция
     * @param {any} params - Параметры для вызываемой приватной функции
     * @param {any} tokens - Настоящие access и refresh токены
     * @returns - Результат функции и новых/выбранных токенов
     */
    async privateCall(callback: any, params: any = {}, tokens: TokensParams) {
        try {
            return await callback(params, tokens.access_token);
        } catch (error: any) {
            if (error.code == 401 || error.code == 403 || error.status == 302) {
                const newTokens = await this.refreshAccessToken(tokens);
                const callbackResult = await callback(params, tokens.access_token);
                newTokens.updateTokens();

                return callbackResult;
            }
            console.log(error);
            throw new Error('Заглушка'); // TODO
        }
    }


    /** Обновление access_token по refresh_token
    *
    * @param {TokensParams} tokens - Настоящие токены
    * @returns {Promise<TokensParams>} - Обновленные токены 
    */
    async refreshAccessToken(tokens: TokensParams) {
        const response = await this.callApi('auth/refresh', {
            body: {
                refresh_token: tokens.refresh_token
            }, 
            headers: {
                'Authorization': `Bearer ${tokens.access_token}`
            }
        }, "POST");

        return new Tokens(response);
    }
}