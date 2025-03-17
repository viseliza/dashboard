import type { SignatureStrategy } from "~/types";
import tashirpizza from '~/assets/images/logos/tashirpizza.svg';
import type { SignatureAPI } from "~/api";

export class TashirPizza implements SignatureStrategy {
    getTitle() {
        return 'Ташир Пицца';
    }

    getAPICall(api: SignatureAPI) {
        return api.tashirPizza;
    }

    getParams(args = null): Record<string, any> {
        return {
            'localtime': {
                example: '1719049200',
                type: 'number',
                required: false,
            },
            'session_id': {
                example: '',
                type: 'string',
                required: true,
            }
        }
    }

    getDescription() {
        return 'Сигнатура для работы с API Ташир Пицца';
    }

    getStyle() {
        return {
            icon: tashirpizza,
            color: '#ea0425'
        }
    }
}
