import { TemplateAPI } from "~/api";
import { Signature } from '~/models';
import type { 
    SignatureAptekiPlus,
    SignatureLetual,
    SignatureMagnit,
    SignatureTashirPizza
} from "~/types";


/** Класс для работы с разделом сигнатур из Pennoe API 
 * 
 * @property {string} access_token - Авторизационный токен
 * @method {Function} aptekiPlus - Создание прокси
 * @method {Function} letual - Создание нескольких прокси
 * @method {Function} magnit - Выборка прокси в диапазоне
 * @method {Function} tashirPizza - Выборка определенной прокси по её Id
 */
export class SignatureAPI extends TemplateAPI {
    access_token;
    static METHOD = 'system/utils/signature/';

    /** Инициализация класса
     * 
     * @param {string} token 
     * @param {string} x_token 
     */
    constructor(x_token: string, token?: string) {
        super(x_token);
        this.access_token = token;
    }

    /** Получение сигнатуры AptekiPlus
    *
    * @param {any} body - Данные для получения сигнатуры
    * @param {string} access_token - Настоящий access_token 
    * @returns {Promise<Signature>} - Модель полученной сигнатуры
    */
    async aptekiPlus(body: SignatureAptekiPlus, access_token: string): Promise<Signature> {
        const response = await super.callApi(SignatureAPI.METHOD + 'aptekiplus', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "POST");
        return new Signature(response);
    }


    /** Получение сигнатуры Letual
    *
    * @param {any} body - Данные для получения сигнатуры 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Signature>} - Модель полученной сигнатуры
    */
    async letual(body: SignatureLetual, access_token: string): Promise<Signature> {
        const response = await super.callApi(SignatureAPI.METHOD + 'letual', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "POST");
        return new Signature(response);
    }


    /** Получение сигнатуры Magnit
    *
    * @param {any} body - Данные для получения сигнатуры 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Signature>} - Модель полученной сигнатуры
    */
    async magnit(body: SignatureMagnit, access_token: string): Promise<Signature> {
        const response = await super.callApi(SignatureAPI.METHOD + 'magnit', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "POST");
        return new Signature(response);
    }


    /** Получение сигнатуры TashirPizza
    *
    * @param {any} body - Данные для получения сигнатуры 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Signature>} - Модель полученной сигнатуры
    */
    async tashirPizza(body: SignatureTashirPizza, access_token: string): Promise<Signature> {
        const response = await super.callApi(SignatureAPI.METHOD + 'tashirpizza', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "POST");
        return new Signature(response);
    }


    /** Получение сигнатуры ConcurentRequest
    *
    * @param {any} body - Данные для получения сигнатуры 
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Signature>} - Модель полученной сигнатуры
    */
    async concurentRequest(body: any, access_token: string): Promise<Signature> {
        const response = await super.callApi(SignatureAPI.METHOD + 'concurentrequest', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            body
        }, "POST");
        return new Signature(response);
    }
}