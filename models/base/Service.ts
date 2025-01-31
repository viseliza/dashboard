import type { IServiceItem, IServices } from "~/types";

/** Модель сервиса из списка сервисов
 * 
 * @param {string} param.code
 * @param {string} param.name
 */
export class ServiceItem {
    code: string;
    name: string;

    /** Конструктор
     * 
     * @param {IServiceItem} opts 
     */
    constructor(opts: IServiceItem) {
        this.code = opts.code;
        this.name   = opts.name;
    }
}


/** Модель списка сервисов 
 * 
 * @param {Array<ServiceItem>} param.data
 */
export class Services {
    data: Array<ServiceItem>;

    /** Конструктор
     * 
     * @param {IServices} opts 
     */
    constructor(opts: IServices) {
        this.data = opts.data;
    }
}