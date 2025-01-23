import type { ErrorMessages } from '@/types/api';

const ERRORS: ErrorMessages = {
    'access-denied': 'У вас нет прав на выполнение этой операции',
    'invalid-token': 'Неверный токен',
    'Bad credentials': 'Пользователь с такой комбинацией логина и пароля не найден'
}

export class AppError extends Error {
    code;

    /** Инициализация класса
     * 
     * @param {string} message 
     * @param {number} code 
     */
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }

    /** Проверка ответа от сервера на ошибки
     * 
     * @param {any} json 
     * @param {any} response 
     */
    static check(json: { detail: keyof ErrorMessages | string }, response: { status: number }) {
        const { detail } = json;
        
        if (Object.keys(ERRORS).indexOf(detail as string) !== -1) 
            throw new AppError(ERRORS[detail as keyof ErrorMessages], response.status);

        if (detail === 'error' && !detail.includes('Успешно'))
            throw new AppError(detail, 500);
    }
}