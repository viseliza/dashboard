import { DurakAPI } from "~/api";
import { Tokens } from "~/models";
import type { ServiceStrategy } from "~/types";

export class DurakStrategy implements ServiceStrategy {
    getAPI() {
        return new DurakAPI('');
    }

    getModes() {
        return ['accounts', 'streaks'];
    }

    getDisplayKeys() {
        return {
            accounts: ['enable', 'id', 'token', 'balance', 'mode', 'created_at', 'updated_at'],
            streaks: ['id', 'points', 'opened', 'opened_at', 'created_at', 'updated_at'],
        }
    }

    getStats() {
        return new DurakAPI('').getStats({}, Tokens.getTokens().access_token);
    }

    getDumpRequest(params: Record<string, any>) {
        return {
            accounts: new DurakAPI('').dumpAccounts(params, Tokens.getTokens().access_token),
            streaks: new DurakAPI('').dumpStreaks(params, Tokens.getTokens().access_token),
        }
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
            streaks: object,
        }
    }

    getAddRequest(params: Record<string, any>) {
        return {
            accounts: new DurakAPI('').createAccount(params, Tokens.getTokens().access_token),
            streaks: new DurakAPI('').createStreak(params, Tokens.getTokens().access_token),
        }
    }

    getAddRequestParams() {
        return {
            accounts: {
                'token': {
                    example: '$2a$06$0123456789abcdefghijkl',
                    type: 'string',
                    required: true,
                },
                'mode': {
                    example: 'main',
                    type: ['main', 'farm', 'reserve_main'],
                    required: false,
                },
            },
            streaks: {
                'points': {
                    example: 10_000,
                    type: 'number',
                    required: true,
                },
            }
        }
    }

    getAddManyRequest(params: Record<string, any>) {
        return {
            accounts: undefined,
            streaks: new DurakAPI('').createManyStreak(params, Tokens.getTokens().access_token),
        }
    }

    getAddManyRequestParams() {
        return {
            streaks: {
                'points': {
                    example: 10_000,
                    type: 'number',
                    required: true,
                },
                'count': {
                    example: 1_000,
                    type: 'number',
                    required: true,
                },
            }
        }
    }

    getUpdateRequest(params: Record<string, any>) {
        return {
            accounts: new DurakAPI('').updateAccount(params, Tokens.getTokens().access_token),
            streaks: new DurakAPI('').updateStreak(params, Tokens.getTokens().access_token),
        }
    }

    getUpdateRequestParams() {
        return {
            accounts: {
                'id': {
                    example: '1234567890',
                    type: 'string',
                    required: true,
                },
                'mode': {
                    example: 'main',
                    type: ['main', 'farm', 'reserve_main'],
                    required: true,
                },
            },
            streaks: {
                'id': {
                    example: '1234567890',
                    type: 'string',
                    required: true,
                },
                'points': {
                    example: 10_000,
                    type: 'number',
                    required: true,
                },
            }
        }
    }

    getDeleteRequest(params: Record<string, any>) {
        return {
            accounts: new DurakAPI('').deleteAccount(params.id, Tokens.getTokens().access_token),
            streaks: new DurakAPI('').deleteStreak(params.id, Tokens.getTokens().access_token),
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
            accounts: new DurakAPI('').wipeAccounts(params, Tokens.getTokens().access_token),
            streaks: new DurakAPI('').wipeStreaks(params, Tokens.getTokens().access_token),
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
            accounts: new DurakAPI('').refreshAccount(params.id, Tokens.getTokens().access_token),
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
        return new DurakAPI('').getStats(params, Tokens.getTokens().access_token);
    }

    getRelinkRequest(params: Record<string, any>) {
        return {
            accounts: undefined,
            streaks: new DurakAPI('').relinkStreaks(params.id, Tokens.getTokens().access_token),
        }
    }

    getRelinkRequestParams() {
        return {
            accounts: undefined,
            streaks: {
                'id': {
                    example: '1234567890',
                    type: 'string',
                    required: true,
                },
            },
        }
    }

    getBalanceRequest(params: Record<string, any>) {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }

    getBalanceRequestParams() {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }

    getProfileRequest(params: Record<string, any>) {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }

    getProfileRequestParams() {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }

    getBalanceHistoryRequest(params: Record<string, any>) {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }

    getBalanceHistoryRequestParams() {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }   
}