import type { TokensParams, ITokens } from '@/types/api';

/**
 * Класс для работы с токенами
 * 
 * @class Tokens
 * @implements {ITokens}
 */
export class Tokens implements ITokens {
    public access_token: string;
    public refresh_token: string;

    /**
     * Конструктор класса
     * 
     * @param tokens - Объект токенов
     */
    constructor(public tokens: TokensParams) {
        this.access_token = tokens.access_token;
        this.refresh_token = tokens.refresh_token;
    }

    /**
     * Метод для получения токенов из кук
     * 
     * @returns {TokensParams} - Объект токенов
     */
    static getTokens(): TokensParams {
        return {
            access_token: useCookie('access_token').value ?? '',
            refresh_token: useCookie('refresh_token').value ?? ''
        };
    }
 
    /**
     * Метод для обновления токенов в куках
     * 
     * @param tokens - Объект токенов
     */
    public updateTokens(tokens?: TokensParams): void {
        useCookie('access_token', {
            maxAge: 60 * 60 * 24 * 7, // 7 дней
            path: '/'
        }).value = tokens?.access_token ?? this.access_token;
        
        useCookie('refresh_token', {
            maxAge: 60 * 60 * 24 * 30, // 30 дней
            path: '/'
        }).value = tokens?.refresh_token ?? this.refresh_token;
    }
}