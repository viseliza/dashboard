import type { AptekiPlusAPI, DurakAPI } from "~/api";

export interface ServiceStrategy {
    getAPI(): DurakAPI | AptekiPlusAPI;
    getModes(): string[];
    getDisplayKeys(): Record<string, any>;
    getStats(): Record<string, any>;
    getDumpRequest(params: Record<string, any>): Record<string, any>;
    getDumpRequestParams(): Record<string, any>;
    getAddRequest(params: Record<string, any>): Record<string, any>;
    getAddRequestParams(): Record<string, any>;
    getAddManyRequest(params: Record<string, any>): Record<string, any>;
    getAddManyRequestParams(): Record<string, any>;
    getUpdateRequest(params: Record<string, any>): Record<string, any>;
    getUpdateRequestParams(): Record<string, any>;
    getWipeRequest(params: Record<string, any>): Record<string, any>;
    getWipeRequestParams(): Record<string, any>;
    getDeleteRequest(params: Record<string, any>): Record<string, any>;
    getDeleteRequestParams(): Record<string, any>;
    getRefreshRequest(params: Record<string, any>): Record<string, any>;
    getRefreshRequestParams(): Record<string, any>;
    getStatsRequest(params: Record<string, any>): Record<string, any>;
    getRelinkRequest(params: Record<string, any>): Record<string, any>;
    getRelinkRequestParams(): Record<string, any>;
    getBalanceRequest(params: Record<string, any>): Record<string, any>;
    getBalanceRequestParams(): Record<string, any>;
    getProfileRequest(params: Record<string, any>): Record<string, any>;
    getProfileRequestParams(): Record<string, any>;
    getBalanceHistoryRequest(params: Record<string, any>): Record<string, any>;
    getBalanceHistoryRequestParams(): Record<string, any>;
}