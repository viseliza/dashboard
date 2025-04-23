import type { AccountMode, IAccount, IAccountCreate, IAccountUpdate } from "~/types";

/** Модель аккаунта Дурака
 * 
 * @param {string}      param.id
 * @param {string}      param.nickname
 * @param {string}      param.token
 * @param {number}      param.balance
 * @param {AccountMode} param.mode
 * @param {boolean}     param.enable
 * @param {any}         param.data
 * @param {number}      param.created_at
 * @param {number}      param.updated_at
 */
export class Account implements IAccount {
    id: string;
    token: string;
    nickname: string;
    balance: number;
    mode: AccountMode;
    enable: boolean;
    created_at: any;
    updated_at: number;
    data: number;

    /** Конструктор
     * 
     * @param {IAccount} opts 
     */
    constructor(opts: IAccount) {
        this.id         = opts.id;
        this.token      = opts.token;
        this.nickname   = opts.nickname;
        this.balance    = opts.balance;
        this.mode       = opts.mode;
        this.enable     = opts.enable;
        this.created_at = opts.created_at;
        this.updated_at = opts.updated_at;
        this.data       = opts.data;
    }
}

export class AccountUpdate implements IAccountUpdate {
    id: string;
    mode: AccountMode;

    /** Конструктор
     * 
     * @param {IAccountUpdate} opts 
     */
    constructor(opts: IAccountUpdate) {
        this.id = opts.id;
        
        if (!['main', 'farm', 'reserve_main'].includes(opts.mode))
            throw new Error('Неправильное значение поля "mode"');
        
        this.mode = opts.mode;
    }
}


export class AccountCreate implements IAccountCreate {
    token: string;
    mode: AccountMode;

    /** Конструктор
     * 
     * @param {IAccountCreate} opts 
     */
    constructor(opts: IAccountCreate) {
        this.token = opts.token;
        this.mode = opts.mode;
    }
}