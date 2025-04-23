import { AptekiPlusAPI } from "~/api"
import type { FilterStrategy } from "~/types";

export class AptekiPlusServiceStrategy implements FilterStrategy {
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
            name: 'Обновление аккаунта',
            value: 'ACCOUNT_REFRESH',
        }, { 
            name: 'Удаление аккаунтов',
            value: 'ACCOUNT_WIPE',
        }, {
            name: 'Смерть аккаунтов',
            value: 'ACCOUNT_DIE',
        }, {
            name: 'Получение баланса аккаунта',
            value: 'ACCOUNT_REQUEST_BALANCE',
        }, {
            name: 'Получение профиля аккаунта',
            value: 'ACCOUNT_REQUEST_PROFILE',
        }, {
            name: 'Получение истории аккаунта',
            value: 'ACCOUNT_REQUEST_HISTORY',
        }, {
            name: 'Получение статистики',
            value: 'GET_STATS',
        }, {
            name: 'Выгрузка логов сервиса',
            value: 'LOGS_SERVICE_DUMP',
        }, {
            name: 'Выгрузка логов аккаунта',
            value: 'LOGS_ACCOUNT_DUMP',
        }];
    }

    getFilters() {
        return {
            'service_id': 'string',
            'action': 'string',
            'log_type': 'string',
            'time': 'string',
            'order': 'string',
            'page': 'page',
            'service': 'string'
        };
    }

    getRequest() {
        return new AptekiPlusAPI('').getServiceLogs
    }
}