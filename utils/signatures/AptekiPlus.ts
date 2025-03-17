import type { SignatureStrategy } from "~/types";
import type { SignatureAPI } from "~/api";
import aptekiPlus from '~/assets/images/logos/aptekiplus.svg';

export class AptekiPlus implements SignatureStrategy {
    getTitle() {
        return 'Аптеки Плюс';
    }

    getAPICall(api: SignatureAPI) {
        return api.aptekiPlus;
    }

    getParams(args = null): Record<string, any> {
        return {
            'url': {
                example: 'https://krakend.a-plus.ru/api/v1/users/customer/auth',
                type: 'string',
                required: true,
            },
            'ts': {
                example: '1719049200',
                type: 'number',
                required: false,
            },
        }
    }

    getDescription() {
        return 'Сигнатура для работы с API Аптеки Плюс';
    }

    getStyle() {
        return {
            icon: aptekiPlus,
            color: '#1f64b2'
        }
    }
}
