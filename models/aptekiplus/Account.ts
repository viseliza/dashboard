import type { 
    AptekiPlusAccountCreateFields, 
    AptekiPlusAccountDumpFields, 
    AptekiPlusAccountFields, 
    AptekiPlusAccountInfoFields 
} from "~/types";

/** Модель аккаунта
 * @class Account
 */
export class AptekiPlusAccount {
    id: string;
    login: string;
    password: string;
    token: string;
    device_id: string;
    region_id: number;
    barcode: string;
    balance: number;
    opened: boolean;
    opened_at: number;
    rechecked_at: number;
    created_at: number;
    updated_at: number;

    constructor(data: AptekiPlusAccountFields) {
        this.id = data.id;
        this.login = data.login;
        this.password = data.password;
        this.token = data.token;
        this.device_id = data.device_id;
        this.region_id = data.region_id;
        this.barcode = data.barcode;
        this.balance = data.balance;
        this.opened = data.opened;
        this.opened_at = data.opened_at;
        this.rechecked_at = data.rechecked_at;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}

/** Модель полученных данных после запроса на создание аккаунта
 * @class AccountCreate
 */
export class AptekiPlusAccountCreate {
    login: string;
    password: string;
    
    constructor(data: AptekiPlusAccountCreateFields) {
        this.login = data.login;
        this.password = data.password;
    }
}

/** Модель полученных данных после запроса на информацию об аккаунте
 * @class AccountInfo
 */
export class AptekiPlusAccountInfo {
    balance: number;
    barcode: string;
    phone: string;

    constructor(data: AptekiPlusAccountInfoFields) {
        this.balance = data.balance;
        this.barcode = data.barcode;
        this.phone = data.phone;
    }
}

/** Модель полученных данных после запроса на дамп аккаунтов
 * @class AccountDump
 */
export class AptekiPlusAccountDump {
    data: AptekiPlusAccount[];
    count: number;

    constructor(data: AptekiPlusAccountDumpFields) {
        this.data = data.data;
        this.count = data.count;
    }
}

/** Модель полученных данных после удаления аккаунтов
 * @class AptekiPlusAccountWipe
 */
export class AptekiPlusAccountWipe {
    status: string;

    constructor(status: string) {
        this.status = status;
    }
}