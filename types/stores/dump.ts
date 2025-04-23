import type { TokensParams } from "~/types";

export type DumpState = {
    tokens: TokensParams;
    classParams: any;
    requestParams: any;
    table: any[];
    defaultRules: any[];
    maxPages: number;
    count: number;
}