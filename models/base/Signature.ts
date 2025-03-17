import type { SignatureReulst } from "~/types";

/** Модель для работы с сигнатурами
 * 
 * @param {string | null} param.headers
 * @param {string} params.result
 */
export class Signature {
    headers;
    result;
    
    /** Конструктор
     * 
     * @param {any} opts 
     */
    constructor(opts: SignatureReulst) {
        this.headers  = opts.headers;
        this.result = opts.result;
    }
}