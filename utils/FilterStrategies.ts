import type { FilterStrategy, Action } from "~/types";

export class FilterStrategies {
    /** Список стратегий действий */
    public filters: Record<string, FilterStrategy> = {};

    /** Добавление действия в стратегию 
     * 
     * @param code - кодовое название действия
     * @param filter - класс стратегии действия
     */
    use(code: string, filter: FilterStrategy) {
        this.filters[code] = filter;
    }

    // constructor() {
    //     this.use('durak', new DurakStrategy());
    //     this.use('aptekiplus', new AptekiPlusStrategy());
    // }

    /** Возвращает список фильтров
     * 
     * @param {string} filter - название фильтра
     * @returns {any} - список фильтров
     */
    getFilters(filter: string): Array<Action> {
        if (!this.filters[filter]) {
            throw new Error('Такого фильтра не существует');
        }
        return this.filters[filter].getFilters();
    }

    /** Возвращает список действий
     * 
     * @param {string} filter - название фильтра
     * @returns {any} - список действий
     */
    getActions(filter: string) {
        if (!this.filters[filter]) {
            throw new Error('Такого фильтра не существует');
        }
        return this.filters[filter].getActions();
    }

    /** Возвращает запрос
     * 
     * @param {string} filter - название фильтра
     * @returns {any} - запрос
     */
    getRequest(filter: string) {
        if (!this.filters[filter]) {
            throw new Error('Такого фильтра не существует');
        }
        return this.filters[filter].getRequest();
    }
}