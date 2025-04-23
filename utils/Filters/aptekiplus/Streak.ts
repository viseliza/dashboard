import { AptekiPlusAPI } from "~/api";
import type { FilterStrategy } from "~/types";

export class AptekiPlusStreakStrategy implements FilterStrategy {
    getFilters() {
        return {
            'streak_id': 'string',
            'action': 'string',
            'log_type': 'string',
            'time': 'string',
            'order': 'string',
            'page': 'page',
            'service': 'string'
        };
    }

    getActions() {
        return [{
            name: 'Штрих открыт',
            value: 'STREAK_OPENED',
        }, {
            name: 'Обновление штриха',
            value: 'STREAK_RELINK',
        }, {
            name: 'Изменение баланса',
            value: 'STREAK_BALANCE_CHANGED',
        }]
    }

    getRequest() {
        return new AptekiPlusAPI('').getStreakLogs
    }
}