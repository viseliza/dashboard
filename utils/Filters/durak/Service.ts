import { DurakAPI } from "~/api";
import type { FilterStrategy } from "~/types";

export class DurakServiceStrategy implements FilterStrategy {
    getActions() {
        return [{
            name: 'Добавление аккаунта',
            value: 'ACCOUNT_ADD',
        }, {
            name: 'Удаление аккаунта',
            value: 'ACCOUNT_DELETE',
        }, {
            name: 'Выгрузка аккаунта',
            value: 'ACCOUNT_DUMP',
        }, {
            name: 'Получение аккаунта',
            value: 'ACCOUNT_GET',
        }, {
            name: 'Рефреш аккаунта',
            value: 'ACCOUNT_REFRESH',
        }, {
            name: 'Обновление аккаунта',
            value: 'ACCOUNT_UPDATE',
        }, {
            name: 'Вайп аккаунтов',
            value: 'ACCOUNT_WIPE',
        }, {
            name: 'Получение серверов',
            value: 'GET_SERVERS',
        }, {
            name: 'Получение статистики',
            value: 'GET_STATS',
        }, {
            name: 'Выгрузка логов сервиса',
            value: 'LOGS_SERVICE_DUMP',
        }, {
            name: 'Выгрузка логов штрихов',
            value: 'LOGS_STREAKS_DUMP',
        }, {
            name: 'Добавление штриха',
            value: 'STREAK_ADD',
        }, {
            name: 'Добавление множества штрихов',
            value: 'STREAK_ADDMANY',
        }, {
            name: 'Удаление штриха',
            value: 'STREAK_DELETE',
        }, {
            name: 'Выгрузка штрихов',
            value: 'STREAK_DUMP',
        }, {
            name: 'Получение штриха',
            value: 'STREAK_GET',
        }, {
            name: 'Релинк штриха',
            value: 'STREAK_RELINK',
        }, {
            name: 'Обновление штриха',
            value: 'STREAK_UPDATE',
        }, {
            name: 'Вайп штрихов',
            value: 'STREAK_WIPE',
        }];
    }

    getFilters() {
        return {
            'action': 'string',
            'log_type': 'string',
            'time': 'string',
            'order': 'string',
            'page': 'page',
            'service': 'string'
        };
    }

    getRequest() {
        return new DurakAPI('').getServiceLogs
    }
}