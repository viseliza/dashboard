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

export type ErrorMessage = {
    detail: string;
    message: string;
    code: number;
}

export type SearchDump = {
    query?: string;
    limit: number;
    offset: number;
}

export type Wipe = {
    confirmation: boolean;
}

export type WipeAnswer = {
    status: string;
}

export type DumpData<T> = {
    data: Array<T>;
    count: number;
}