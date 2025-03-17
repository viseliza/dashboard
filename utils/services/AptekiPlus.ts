import { AptekiPlusAccountCreate, Tokens } from "~/models";
import type { ServiceStrategy } from "~/types";
import { AptekiPlusAPI } from "~/api";

export class AptekiPlusStrategy implements ServiceStrategy {
    getAPI() {
        return new AptekiPlusAPI('');
    }

    getModes() {
        return ['accounts'];
    }

    getDisplayKeys() {
        return {
            accounts: ['enable', 'id', 'token', 'balance', 'mode', 'created_at', 'updated_at'],
        }
    }

    getDumpRequest(params: Record<string, any>) {
        return {
            accounts: new AptekiPlusAPI('').dumpAccounts(params, Tokens.getTokens().access_token),
        }
    }

    getStats() {
        return new AptekiPlusAPI('').getStats({}, Tokens.getTokens().access_token);
    }

    getDumpRequestParams() {
        const object = {
            'query': 'string',
            'limit': 'number',
            'offset': 'number',
            'filter_by': 'string',
            'order_by': 'string',
        }
        return {
            accounts: object,
        }
    }

    getAddRequest(params: AptekiPlusAccountCreate) {
        return {
            accounts: new AptekiPlusAPI('').createAccount(params, Tokens.getTokens().access_token),
        }
    }

    getAddRequestParams() {
        return {
            accounts: {
                'login': {
                    example: '79001112233',
                    type: 'string',
                    required: true,
                },
                'password': {
                    example: 'S3cr3tPWD',
                    type: 'string',
                    required: true,
                },
            },
        }
    }

    getAddManyRequest(params: Record<string, any>) {
        return {
            accounts: undefined
        }
    }

    getAddManyRequestParams() {
        return {
            accounts: undefined
        }
    }

    getUpdateRequest(params: Record<string, any>) {
        return {
            accounts: undefined
        }
    }

    getUpdateRequestParams() {
        return {
            accounts: undefined
        }
    }

    getDeleteRequest(params: Record<string, any>) {
        return {
            accounts: new AptekiPlusAPI('').deleteAccount(params.id, Tokens.getTokens().access_token)
        }
    }

    getDeleteRequestParams() {
        return {
            'id': {
                example: '1234567890',
                type: 'string',
                required: true,
            },
        }
    }

    getWipeRequest(params: Record<string, any>) {
        return {
            accounts: new AptekiPlusAPI('').wipeAccounts(params, Tokens.getTokens().access_token)
        }
    }

    getWipeRequestParams() {
        return {
            'confirm': {
                example: true,
                type: 'boolean',
                required: true,
            },
        }
    }

    getRefreshRequest(params: Record<string, any>) {
        return {
            accounts: new AptekiPlusAPI('').refreshAccount(params.id, Tokens.getTokens().access_token),
            streaks: undefined,
        }
    }

    getRefreshRequestParams() {
        return {
            'id': {
                example: '1234567890',
                type: 'string',
                required: true,
            },
        }
    }

    getStatsRequest(params: Record<string, any>) {
        return new AptekiPlusAPI('').getStats(params, Tokens.getTokens().access_token);
    }

    getRelinkRequest(params: Record<string, any>) {
        return {
            accounts: undefined
        }
    }

    getRelinkRequestParams() {
        return {
            accounts: undefined
        }
    }

    getBalanceRequest(params: Record<string, any>) {
        return {
            accounts: new AptekiPlusAPI('').getBalance(params.id, Tokens.getTokens().access_token),
        }
    }

    getBalanceRequestParams() {
        return {
            'id': {
                example: '1234567890',
                type: 'string',
                required: true,
            },
        }
    }

    getProfileRequest(params: Record<string, any>) {
        return {
            accounts: new AptekiPlusAPI('').getProfile(params.id, Tokens.getTokens().access_token),
        }
    }

    getProfileRequestParams() {
        return {
            'id': {
                example: '1234567890',
                type: 'string',
                required: true,
            },
        }
    }

    getBalanceHistoryRequest(params: Record<string, any>) {
        const { id } = params;
        delete params.id;
        return {
            accounts: new AptekiPlusAPI('').getBalanceHistory({ id, params }, Tokens.getTokens().access_token),
        }
    }

    getBalanceHistoryRequestParams() {
        return {
            'id': {
                example: '1234567890',
                type: 'string',
                required: true,
            },
            'page': {
                example: 1,
                type: 'number',
                required: false,
            },
            'limit': {
                example: 20,
                type: 'number',
                required: false,
            },
        }
    }
}