import type { DumpData } from "~/types";
import { TemplateAPI } from "../TemplateAPI";
import { 
    AuthLogin, 
    ServiceItem, 
    Services, 
    Tokens,
} from "~/models";


export class PennoeAPI extends TemplateAPI {
    /** Инициализация класса
     * 
     * @param {string} x_token 
     */
    constructor(x_token: string) {
        super(x_token);
    }


    /** Авторизация
    *
    * @param {AuthLogin} authLogin - Данные для авторизации
    * @returns {Promise<Tokens>} - Токены от аккаунта 
    */
    async authorize(authLogin: AuthLogin): Promise<Tokens> {
        const response = await super.callApi('auth/login', {
            body: {
                username: authLogin.username,
                password: authLogin.password,
            }
        }, "POST");
        return new Tokens(response);
    }


    /** Получение списка всех сервисов
    *
    * @param {string} params
    * @param {string} access_token - Настоящий access_token
    * @returns {Promise<Array<ServiceItem>}
    */
    async getServices(params: any, access_token: string) {
        const services: DumpData<ServiceItem> = await super.callApi('system/services', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        return services.data.map(service => new ServiceItem(service));
    }
}