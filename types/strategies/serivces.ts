export interface ServiceStrategy {
    getAPI(): any;
    getModes(): string[];
    getDisplayKeys(): Record<string, any>;
    getStats(): any;
    getActions(mode: string): Record<string, any>;
    getDumpRequest(): any;
    getDumpRequestParams(): Record<string, any>;
    getAddRequest(): any;
    getAddRequestParams(): Record<string, any>;
    getAddManyRequest(): any;
    getAddManyRequestParams(): Record<string, any>;
    getUpdateRequest(): any;
    getUpdateRequestParams(): Record<string, any>;
    getWipeRequest(): any;
    getWipeRequestParams(): Record<string, any>;
    getDeleteRequest(): any;
    getRefreshRequest(): any;
    getRefreshRequestParams(): Record<string, any>;
    getStatsRequest( ): Record<string, any>;
    getRelinkRequest(): any;
    getRelinkRequestParams(): Record<string, any>;
    getBalanceRequest(): any;
    getBalanceRequestParams(): Record<string, any>;
    getProfileRequest(): any;
    getProfileRequestParams(): Record<string, any>;
    getBalanceHistoryRequest(): any;
    getBalanceHistoryRequestParams(): Record<string, any>;
}


export type ServiceData = {
    code: string;
    mode: string;
}