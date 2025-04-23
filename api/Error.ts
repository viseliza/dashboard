import type { ErrorMessages } from '@/types/api';

const ERRORS: ErrorMessages = {
    'access-denied': 'У вас нет прав на выполнение этой операции',
    'invalid-token': 'Неверный токен',
    'Bad credentials': 'Пользователь с такой комбинацией логина и пароля не найден'
}

export class AppError extends Error {
    detail: string;
    code: number;

    /** Инициализация класса
     * 
     * @param {string} detail - подробности ошибки
     * @param {string} message - текст ошибки
     * @param {number} code - код ошибки
     */
    constructor(detail: string, message: string, code: number) {
        super(message);
        this.detail = detail;
        this.code = code;
    }

    /** Проверка ответа от сервера на ошибки
     * 
     * @param {any} json - ответ от сервера
     * @param {any} response - код ответа от сервера
     */
    static check(json: { detail: keyof ErrorMessages | string }, response: { status: number }) {
        const { detail } = json;
        
        if (Object.keys(ERRORS).indexOf(detail as string) !== -1) 
            throw new AppError(detail, ERRORS[detail as keyof ErrorMessages], response.status);

        if (detail === 'error' && !detail.includes('Успешно'))
            throw new AppError(detail, 'Ошибка сервера', 500);
    }
}