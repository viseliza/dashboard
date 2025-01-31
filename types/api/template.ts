import type { Tokens } from "~/models";

export interface ITemplateAPI {
    callApi(
        method: string, 
        params?: any, 
        call?: string
    ): any;
    privateCall(
        callback: Function, 
        params: any, 
        tokens: Tokens
    ): Promise<{ tokens: Tokens, callbackResult: any} | undefined>;
    refreshAccessToken(tokens: Tokens): Promise<Tokens>;
}

export type Params = {
    headers?: any;
    body?: any;
    opts?: any;
}

export interface ITemplateAPI {
    callApi(
        method: string, 
        params?: any, 
        call?: string
    ): any;
    privateCall(
        callback: Function, 
        params: any, 
        tokens: Tokens
    ): Promise<{ tokens: Tokens, callbackResult: any} | undefined>;
    refreshAccessToken(tokens: Tokens): Promise<Tokens>;
}

