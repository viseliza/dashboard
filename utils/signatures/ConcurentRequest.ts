import type { SignatureAPI } from "~/api";
import type { SignatureStrategy, SignatureStyle } from "~/types";

export class ConcurentRequest implements SignatureStrategy {
    getTitle() {
        return 'Конкурентные запросы';
    }

    getAPICall(api: SignatureAPI) {
        return api.concurentRequest; // TODO: Добавить метод
    }

    getParams(args = null): Record<string, any> {
        return {
            'method': {
                example: 'GET',
                type: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
                required: true,
            },
            'url': {
                example: 'https://api.concurent.ru/v1/orders',
                type: 'string',
                required: true,
            },
            'data': {
                example: '',
                type: 'object',
                required: false,
            },
            'headers': {
                example: '',
                type: 'object',
                required: false,
            },
            'use_proxy': {
                example: 'false',
                type: ['true', 'false'],
                required: false,
            },
        }
    }

    getDescription() {
        return 'Сигнатура для работы с конкурентными запросами';
    }

    getStyle(): SignatureStyle {
        return {
            icon: null,
            color: null
        }
    }
}