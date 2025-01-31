import type { ISetting, SettingKeys } from "~/types";

/** Модель для работы с настройками
 * 
 * @param param.title - Наименование настройки
 * @param params.key - Код настройки
 * @param params.value - Значение настройки
 * @param params.type - Тип параметра
 * @param params.secret - Секретность параметра
 */
export class Setting implements ISetting {
    title: string;
    key: SettingKeys;
    value?: string | number;
    type: string;
    secret: boolean;
    
    /** Конструктор
     * 
     * @param {ISetting} opts 
     */
    constructor(opts: ISetting) {
        this.title  = opts.title;
        this.key = opts.key;
        this.value = opts.value;
        this.type = opts.type;
        this.secret = opts.secret;
    }
}