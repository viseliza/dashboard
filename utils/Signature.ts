import type { SignatureAPI } from "~/api";
import type { SignatureStrategy } from "~/types";

/** Класс для работы с сигнатурами */
export class Signatures {
    /** Список стратегий сигнатур */
    public strategies: Record<string, SignatureStrategy> = {};


    /** Добавление сигнатуры в стратегию 
     * 
     * @param name - кодовое название сигнатуры
     * @param strategy - класс стратегии сигнатуры
     */
    use(name: string, strategy: SignatureStrategy) {
        this.strategies[name] = strategy;
    }

    /** Получение названия сигнатуры
     * 
     * @param name - кодовое название сигнатуры
     * @returns - название сигнатуры на русском
     */
    getTitle(name: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getTitle();
    }

    /** Получение метода API для сигнатуры
     * 
     * @param name - название сигнатуры
     * @param api - экземпляр API
     * @returns - метод API
     */
    getAPICall(name: string, api: SignatureAPI) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getAPICall(api);
    }

    /** Получение параметров создания сигнатуры
     * 
     * @param name - название сигнатуры
     * @param args - аргументы для сигнатуры
     * @returns - параметры сигнатуры
     */
    getParams(name: string, args = null) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getParams.apply(null, [args]);
    }

    /** Получение описания сигнатуры
     * 
     * @param name - кодовое название сигнатуры
     * @returns - описание сигнатуры
     */
    getDescription(name: string) {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getDescription();
    }

    /** Получение стилей сигнатуры
     * 
     * @param name - название сигнатуры
     * @returns - стили сигнатуры
     */
    getStyle(name: string): any {
        if (!this.strategies[name]) {
            throw new Error('Такой стратегии не существует');
        }
        return this.strategies[name].getStyle();
    }
}