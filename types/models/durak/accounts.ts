// Create account
export type AccountCreate = {
    token: string;
    mode: AccountMode;
}

// Update account
export interface IAccountUpdate {
    id: string;
    mode: AccountMode;
}

export type AccountMode = 'main' | 'farm' | 'reserve_main';


export interface IAccount {
    id: string;
    token: string,
    nickname: string,
    balance: number,
    mode: AccountMode,
    enable: boolean,
    data: any,
    created_at: number,
    updated_at: number
}


export interface IAccountCreate {
    token: string;
    mode: AccountMode;
}