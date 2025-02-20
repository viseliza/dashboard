import type { SignatureStrategy } from "~/types";

export class ConcurentRequest implements SignatureStrategy {
    getTitle() {
        return 'Конкурентные запросы';
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

    getStyle() {
        return {
            icon: null,
            color: null
        }
    }
}