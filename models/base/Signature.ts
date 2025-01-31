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


    static concurentParams = {
        method: {
            value: 'GET',
            type: 'string?',
            example: 'GET'

        },
        url: {
            value: '',
            type: 'string',
            example: 'https://api.ipify.org/?format=json'

        },
        data: {
            value: '',
            type: 'textarea?',
            example: ''
        },
        headers: {
            value: '',
            type: 'textarea?',
            example: ''
        },
        use_proxy: {
            value: true,
            type: [true, false],
            example: 'true'
        },
        workers: {
            value: 20,
            type: 'number?',
            example: '20'
        }
    }

    static aptekiPlusParams = {
        url: {
            value: '',
            type: 'string',
            example: 'https://krakend.a-plus.ru/api/...'

        },
        ts: {
            value: '',
            type: 'number?',
            example: 1720624178135
        }
    }

    static letualParams = {
        url: {
            value: '',
            type: 'string',
            example: 'https://api-v2.letu.ru/s/api/...'

        },
        jsession: {
            value: '',
            type: 'string?',
            example: 'null'
        },
        ts: {
            value: '',
            type: 'number?',
            example: 1720624178135
        }
    }

    static magnitParams = {
        os: {
            value: '',
            type: 'string?',
            example: 'android'
        },
        version: {
            value: '',
            type: 'string?',
            example: '8.11.0'
        },
        device_id: {
            value: '',
            type: 'string?',
            example: 'c37aaaf8-3ce1-36ec-9895-9d38a56e0993'
        },
        phone_number: {
            value: '',
            type: 'string',
            example: '79001112233'
        },
        path: {
            value: '',
            type: 'string',
            example: '/v2/orders/active/list?service=...'
        },
        body: {
            value: '',
            type: 'string?',
            example: 'null'
        },
        access_token: {
            value: '',
            type: 'string?',
            example: 'eyJ...'
        },
        master_key: {
            value: '',
            type: 'string?',
            example: 'null'
        }        
    }

    static tashirPizzaParams = {
        localtime: {
            value: '',
            type: 'number?',
            example: 1712435095164

        },
        session_id: {
            value: '',
            type: 'string',
            example: 'string'
        }
    }
}