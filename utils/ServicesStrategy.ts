import type { ServiceStrategy } from "~/types";

/** Класс для работы с сервисами */
export class ServicesStrategy {
    /** Список стратегий сервисов */
    public strategies: Record<string, ServiceStrategy> = {};

    /** Добавление сигнатуры в стратегию 
     * 
     * @param name - кодовое название сервиса
     * @param strategy - класс стратегии сервиса
     */
    use(name: string, strategy: ServiceStrategy) {
        this.strategies[name] = strategy;
    }

    /***********************/
    /* * * * I N F O * * * */
    /***********************/

    getAPI(name: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getAPI();
    }

    /** Отображаемые в таблице ключи
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @returns - ключи для отображения данных
     */
    getDisplayKeys(name: string, mode: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getDisplayKeys()[mode];
    }

    /** Получение статистики сервиса
     * 
     * @param name - кодовое название сервиса
     * @returns - статистика сервиса
     */
    getStats(name: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getStats();
    }

    /*************************/
    /* * S T R E A K S  & * */
    /* * A C C O U N T S  * */
    /*************************/

    /** Получение режимов сервиса
     * 
     * @param name - кодовое название сервиса
     * @returns - название сервиса на русском
     */
    getModes(name: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getModes();
    }

    /** Получение запроса на получение данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @param params - параметры запроса
     * @returns - запрос на получение данных
     */
    getDumpRequest(name: string, mode: string, params: Record<string, any>) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getDumpRequest(params)[mode];
    }

    /** Получение запроса на получение данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @returns - запрос на получение данных
     */
    getDumpRequestParams(name: string, mode: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getDumpRequestParams()[mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @param params - параметры запроса
     * @returns - запрос на добавление данных
     */
    getAddRequest(name: string, mode: string, params: Record<string, any>) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getAddRequest(params)[mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @returns - запрос на добавление данных
     */
    getAddRequestParams(name: string, mode: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getAddRequestParams()[mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @param params - параметры запроса
     * @returns - запрос на добавление данных
     */
    getAddManyRequest(name: string, mode: string, params: Record<string, any>) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getAddManyRequest(params)[mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @returns - запрос на добавление данных
     */
    getAddManyRequestParams(name: string, mode: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getAddManyRequestParams()[mode];
    }

    /** Получение запроса на обновление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @param params - параметры запроса
     * @returns - запрос на обновление данных
     */
    getUpdateRequest(name: string, mode: string, params: Record<string, any>) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getUpdateRequest(params)[mode];
    }

    /** Получение запроса на обновление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @returns - запрос на обновление данных
     */
    getUpdateRequestParams(name: string, mode: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getUpdateRequestParams()[mode];
    }

    
    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @param params - параметры запроса
     * @returns - запрос на добавление данных
     */
    getDeleteRequest(name: string, mode: string, params: Record<string, any>) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getDeleteRequest(params)[mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @returns - запрос на добавление данных
     */
    getDeleteRequestParams(name: string, mode: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getDeleteRequestParams()[mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @param params - параметры запроса
     * @returns - запрос на добавление данных
     */
    getWipeRequest(name: string, mode: string, params: Record<string, any>) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getWipeRequest(params)[mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @returns - запрос на добавление данных
     */
    getWipeRequestParams(name: string, mode: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getWipeRequestParams()[mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @param params - параметры запроса
     * @returns - запрос на добавление данных
     */
    getRefreshRequest(name: string, mode: string, params: Record<string, any>) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getRefreshRequest(params)[mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @returns - запрос на добавление данных
     */
    getRefreshRequestParams(name: string, mode: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getRefreshRequestParams()[mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @param params - параметры запроса
     * @returns - запрос на добавление данных
     */
    getRelinkRequest(name: string, mode: string, params: Record<string, any>) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getRelinkRequest(params)[mode];
    }

    /** Получение запроса на добавление данных
     * 
     * @param name - кодовое название сервиса
     * @param mode - режим сервиса
     * @returns - запрос на добавление данных
     */
    getRelinkRequestParams(name: string, mode: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getRelinkRequestParams()[mode];
    }


    /*********************/
    /* * O P T I O N S * */
    /*********************/

    /** Получение запроса на получение баланса
     * 
     * @param name - кодовое название сервиса
     * @param params - параметры запроса
     * @returns - запрос на получение баланса
     */
    getBalanceRequest(name: string, params: Record<string, any>) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getBalanceRequest(params);
    }

    /** Получение параметров запроса на получение баланса
     * 
     * @param name - кодовое название сервиса
     * @returns - параметры запроса на получение баланса
     */
    getBalanceRequestParams(name: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getBalanceRequestParams();
    }

    /** Получение запроса на получение профиля
     * 
     * @param name - кодовое название сервиса
     * @param params - параметры запроса
     * @returns - запрос на получение профиля
     */
    getProfileRequest(name: string, params: Record<string, any>) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getProfileRequest(params);
    }

    /** Получение параметров запроса на получение профиля
     * 
     * @param name - кодовое название сервиса
     * @returns - параметры запроса на получение профиля
     */
    getProfileRequestParams(name: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getProfileRequestParams();
    }

    /** Получение запроса на получение истории баланса
     * 
     * @param name - кодовое название сервиса
     * @param params - параметры запроса
     * @returns - запрос на получение истории баланса
     */
    getBalanceHistoryRequest(name: string, params: Record<string, any>) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getBalanceHistoryRequest(params);
    }

    /** Получение параметров запроса на получение истории баланса
     * 
     * @param name - кодовое название сервиса
     * @returns - параметры запроса на получение истории баланса
     */
    getBalanceHistoryRequestParams(name: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getBalanceHistoryRequestParams();
    }
}
