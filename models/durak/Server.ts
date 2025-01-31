import type { IServer } from "~/types";

/** Модель сервера Дурака
 * 
 * @param {string}  param.code
 * @param {string}  param.name
 * @param {string}  param.image
 */
export class Server implements IServer {
    data;

    /** Конструктор
     * 
     * @param {IServer} opts 
     */
    constructor(opts: IServer) {
        this.data = {
            code: opts.data.code,
            name: opts.data.name,
            image: opts.data.image   
        }
    }
}