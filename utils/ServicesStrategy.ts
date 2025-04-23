import type { ServiceStrategy, ServiceData } from "~/types";
import { Tokens } from "~/models";

/** Класс для работы с сервисами */
export class ServicesStrategy {
    /** Список стратегий сервисов */
    public strategies: Record<string, ServiceStrategy> = {};

    /** Добавление сигнатуры в стратегию 
     * 
     * @param code - кодовое название сервиса
     * @param strategy - класс стратегии сервиса
     */
    use(code: string, strategy: ServiceStrategy) {
        this.strategies[code] = strategy;
    }

    constructor() {
        this.use('durak', new DurakStrategy());
        this.use('aptekiplus', new AptekiPlusStrategy());
    }

    /***********************/
    /* * * * I N F O * * * */
    /***********************/

    getAPI(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getAPI();
    }

    /** Отображаемые в таблице ключи
     * 
     * @param data - данные сервиса
     * @returns - ключи для отображения данных
     */
    getDisplayKeys(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getDisplayKeys()[data.mode];
    }

    /** Получение статистики сервиса
     * 
     * @param data - данные сервиса
     * @returns - статистика сервиса
     */
    getStats(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getStats()(
            {}, 
            Tokens.getTokens().access_token
        );
    }

    /**********************/
    /* * A C T I O N S  * */
    /**********************/

    /** Получение действий сервиса
     * 
     * @param data - данные сервиса
     * @returns - действия сервиса
     */
    getActions(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getActions(data.mode)[data.mode];
    }

    /*************************/
    /* * S T R E A K S  & * */
    /* * A C C O U N T S  * */
    /*************************/

    /** Получение режимов сервиса
     * 
     * @param data - данные сервиса
     * @returns - название сервиса на русском
     */
    getModes(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getModes();
    }

    /** Получение запроса на получение данных
     * 
     * @param data - данные сервиса
     * @param params - параметры запроса
     * @returns - запрос на получение данных
     */
    getDumpRequest(data: ServiceData, params: Record<string, any>) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getDumpRequest()[data.mode](
            params, 
            Tokens.getTokens().access_token
        );
    }

    /** Получение запроса на получение данных
     * 
     * @param data - данные сервиса
     * @returns - запрос на получение данных
     */
    getDumpRequestParams(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getDumpRequestParams()[data.mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param data - данные сервиса
     * @param params - параметры запроса
     * @returns - запрос на добавление данных
     */
    getAddRequest(data: ServiceData, params: Record<string, any>) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getAddRequest()[data.mode](
            params, 
            Tokens.getTokens().access_token
        );
    }

    /** Получение запроса на добавление данных
     * 
     * @param data - данные сервиса
     * @returns - запрос на добавление данных
     */
    getAddRequestParams(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getAddRequestParams()[data.mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param data - данные сервиса
     * @param params - параметры запроса
     * @returns - запрос на добавление данных
     */
    getAddManyRequest(data: ServiceData, params: Record<string, any>) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getAddManyRequest()[data.mode](
            params, 
            Tokens.getTokens().access_token
        );
    }

    /** Получение запроса на добавление данных
     * 
     * @param data - данные сервиса
     * @returns - запрос на добавление данных
     */
    getAddManyRequestParams(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getAddManyRequestParams()[data.mode];
    }

    /** Получение запроса на обновление данных
     * 
     * @param data - данные сервиса
     * @param params - параметры запроса
     * @returns - запрос на обновление данных
     */
    getUpdateRequest(data: ServiceData, params: Record<string, any>) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getUpdateRequest()[data.mode](
            params, 
            Tokens.getTokens().access_token
        );
    }

    /** Получение запроса на обновление данных
     * 
     * @param data - данные сервиса
     * @returns - запрос на обновление данных
     */
    getUpdateRequestParams(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getUpdateRequestParams()[data.mode];
    }

    
    /** Получение запроса на удаление данных
     * 
     * @param data - данные сервиса
     * @param params - параметры запроса
     * @returns - запрос на удаление данных
     */
    getDeleteRequest(data: ServiceData, params: Record<string, any>) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getDeleteRequest()[data.mode](
            params.id, 
            Tokens.getTokens().access_token
        );
    }

    /** Получение запроса на очистку данных
     * 
     * @param data - данные сервиса
     * @param params - параметры запроса
     * @returns - запрос на очистку данных
     */
    getWipeRequest(data: ServiceData, params: Record<string, any>) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getWipeRequest()[data.mode](
            params, 
            Tokens.getTokens().access_token
        );
    }

    /** Получение запроса на получение параметров очистки данных
     * 
     * @param data - данные сервиса
     * @returns - запрос на очистку данных
     */
    getWipeRequestParams(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getWipeRequestParams()[data.mode];
    }

    /** Получение запроса на обновление данных
     * 
     * @param data - данные сервиса
     * @param params - параметры запроса
     * @returns - запрос на обновление данных
     */
    getRefreshRequest(data: ServiceData, params: Record<string, any>) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getRefreshRequest()[data.mode](
            params.id, 
            Tokens.getTokens().access_token
        );
    }

    /** Получение запроса на получение параметров обновления данных
     * 
     * @param data - данные сервиса
     * @returns - запрос на обновление данных
     */
    getRefreshRequestParams(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getRefreshRequestParams()[data.mode];
    }

    /** Получение запроса на релинк данных
     * 
     * @param data - данные сервиса
     * @param params - параметры запроса
     * @returns - запрос на релинк данных
     */
    getRelinkRequest(data: ServiceData, params: Record<string, any>) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getRelinkRequest()[data.mode](
            params.id, 
            Tokens.getTokens().access_token
        );
    }

    /** Получение запроса на получение параметров релинка данных
     * 
     * @param data - данные сервиса
     * @returns - запрос на релинк данных
     */
    getRelinkRequestParams(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getRelinkRequestParams()[data.mode];
    }


    /*********************/
    /* * O P T I O N S * */
    /*********************/

    /** Получение запроса на получение баланса
     * 
     * @param data - данные сервиса
     * @param params - параметры запроса
     * @returns - запрос на получение баланса
     */
    getBalanceRequest(data: ServiceData, params: Record<string, any>) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getBalanceRequest()[data.mode](
            params.id, 
            Tokens.getTokens().access_token
        );
    }

    /** Получение параметров запроса на получение баланса
     * 
     * @param data - данные сервиса
     * @returns - параметры запроса на получение баланса
     */
    getBalanceRequestParams(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getBalanceRequestParams();
    }

    /** Получение запроса на получение профиля
     * 
     * @param data - данные сервиса
     * @param params - параметры запроса
     * @returns - запрос на получение профиля
     */
    getProfileRequest(data: ServiceData, params: Record<string, any>) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getProfileRequest()[data.mode](
            params.id, 
            Tokens.getTokens().access_token
        );
    }

    /** Получение параметров запроса на получение профиля
     * 
     * @param data - данные сервиса
     * @returns - параметры запроса на получение профиля
     */
    getProfileRequestParams(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getProfileRequestParams();
    }

    /** Получение запроса на получение истории баланса
     * 
     * @param data - данные сервиса
     * @param params - параметры запроса
     * @returns - запрос на получение истории баланса
     */
    getBalanceHistoryRequest(data: ServiceData, params: Record<string, any>) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getBalanceHistoryRequest()[data.mode](
            params.id, 
            Tokens.getTokens().access_token
        );
    }

    /** Получение параметров запроса на получение истории баланса
     * 
     * @param data - данные сервиса
     * @returns - параметры запроса на получение истории баланса
     */
    getBalanceHistoryRequestParams(data: ServiceData) {
        if (!this.strategies[data.code]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[data.code].getBalanceHistoryRequestParams();
    }
}
