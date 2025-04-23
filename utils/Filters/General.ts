import type { FilterStrategy } from "~/types";
import { LogsAPI } from "~/api";

export class GeneralStrategy implements FilterStrategy {
    getFilters() {
        return {
            'action': 'string',
            'log_type': 'string',
            'time': 'string',
            'order': 'string',
            'page': 'page',
        };
    }

    getActions() {
        return [{
            name: 'Авторизация middleware',
            value: 'AUTH_MIDDLEWARE'
        }, 
        {
            name: 'Дамп логов',
            value: 'DUMP_LOGS'
        }, 
        {
            name: 'Дамп сервисов',
            value: 'DUMP_SERVICES'
        }, 
        {
            name: 'Дамп настроек',
            value: 'DUMP_SETTINGS'
        }, 
        {
            name: 'Обновление режима аккаунтов',
            value: 'DURAK_ACCOUNTS_UPDATED_MODE'
        }, 
        {
            name: 'Генерация подписи',
            value: 'GENERATE_SIGNATURE'
        }, 
        {
            name: 'Очистка логов',
            value: 'LOGS_ERASED'
        }, 
        {
            name: 'Добавление прокси',
            value: 'PROXY_ADD'
        }, 
        {
            name: 'Добавление множества прокси',
            value: 'PROXY_ADDMANY'
        }, 
        {
            name: 'Удаление прокси',
            value: 'PROXY_DELETE'
        }, 
        {
            name: 'Отключение прокси',
            value: 'PROXY_DISABLE'
        }, 
        {
            name: 'Дамп прокси',
            value: 'PROXY_DUMP'
        }, 
        {
            name: 'Получение прокси',
            value: 'PROXY_GET'
        }, 
        {
            name: 'Обновление прокси',
            value: 'PROXY_REFRESHED'
        }, 
        {
            name: 'Обновление прокси',
            value: 'PROXY_UPDATE'
        }, 
        {
            name: 'Конфигурация системы',
            value: 'SYSTEM_CONFIGURED'
        }, 
        {
            name: 'Обновление настроек',
            value: 'UPDATE_SETTINGS'
        }, 
        {
            name: 'Авторизация пользователя',
            value: 'USER_AUTHORIZATION'
        }, 
        {
            name: 'Обновление токена пользователя',
            value: 'USER_REFRESH_TOKEN'
        }];
    }

    getRequest() {
        return new LogsAPI('', '').dump;
    }
}