import type { SignatureStrategy } from "~/types";
import type { SignatureAPI } from "~/api";
import magnit from '~/assets/images/logos/magnit.svg';

export class Magnit implements SignatureStrategy {
    getTitle() {
        return 'Магнит';
    }

    getAPICall(api: SignatureAPI) {
        return api.magnit;
    }

    getParams(args = null): Record<string, any> {
        return {
            'os': {
                example: 'android',
                type: 'string',
                required: false,
            },
            'version': {
                example: '8.11.0',
                type: 'string',
                required: false,
            },
            'device_id': {
                example: 'c37aaaf8-3ce1-36ec-9895-9d38a56e0993',
                type: 'string',
                required: false,
            },
            'phone_number': {
                example: '79001112233',
                type: 'string',
                required: true,
            },
            'path': {
                example: '/v2/orders/active/list?service=&page=1&lookingForCourier=true',
                type: 'string',
                required: true,
            },
            'body': {
                example: '',
                type: 'object',
                required: false,
            },
            'access_token': {
                example: 'eyJhbGciOiJIUzI1NiIsInR5...',
                type: 'string',
                required: false,
            },
            'master_key': {
                example: '***',
                type: 'string',
                required: false,
            },
        }
    }

    getDescription() {
        return 'Сигнатура для работы с API Магнит';
    }

    getStyle() {
        return {
            icon: magnit,
            color: '#e6000e'
        }
    }
}
