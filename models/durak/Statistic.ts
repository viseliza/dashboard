import type { StatisticData } from "~/types";

/** Модель статистики Дурака
 * 
 * @param {any}   param.account
 * @param {any}   param.balances
 * @param {any}    param.streaks
 */
export class Statistic {
    account;
    balances;
    streaks;

    /** Конструктор
     * 
     * @param {any} opts 
     */
    constructor(opts: StatisticData) {
        this.account     = opts.account;
        this.balances   = opts.balances;
        this.streaks  = opts.streaks;
    }

}