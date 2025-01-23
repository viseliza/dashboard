// Интерфейс для объекта ошибок
export interface ErrorMessages {
    'access-denied': string;
    'invalid-token': string;
    'Bad credentials': string;
}

export type TokensParams = {
    access_token: string;
    refresh_token: string;
}

export interface ITokens {
    tokens: TokensParams;
    updateTokens(tokens?: TokensParams): void;
}