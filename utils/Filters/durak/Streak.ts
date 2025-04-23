import { DurakAPI } from "~/api";
import type { FilterStrategy } from "~/types";

export class DurakStreakStrategy implements FilterStrategy {
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
            name: 'Авторизация бота',
            value: 'BOT_AUTH',
        }, {
            name: 'Готовность бота',
            value: 'BOT_GAME_READY',
        }, {
            name: 'Сдача бота',
            value: 'BOT_SURRENDER',
        }, {
            name: 'Создание игры',
            value: 'GAME_CREATE',
        }, {
            name: 'Завершение игры',
            value: 'GAME_END',
        }, {
            name: 'Инициализация игры',
            value: 'GAME_INIT',
        }, {
            name: 'Игрок в игре',
            value: 'GAME_PLAYER',
        }, {
            name: 'Начало игры',
            value: 'GAME_START',
        }, {
            name: 'Остановка игры',
            value: 'GAME_STOP',
        }, {
            name: 'Статус игры',
            value: 'GET_STATUS',
        }, {
            name: 'Завершение раунда',
            value: 'ROUND_END',
        }, {
            name: 'Релинк штриха',
            value: 'STREAK_RELINK',
        }];
    }

    getRequest() {
        return new DurakAPI('').getStreakLogs
    }
}