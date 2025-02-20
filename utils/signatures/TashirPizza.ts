import type { SignatureStrategy } from "~/types";
import tashirpizza from '~/assets/images/logos/tashirpizza.svg';
export class TashirPizza implements SignatureStrategy {
    getTitle() {
        return 'Ташир Пицца';
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
