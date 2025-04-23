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
            accounts: ['enable', 'id', 'login', 'balance', 'barcode', 'created_at', 'updated_at'],
            streaks: undefined,
        }
    }

    getActions(mode: 'accounts' | 'streaks') {
        return {
            accounts: {
                'Добавить': {
                    request: new AptekiPlusAPI('').createAccount,
                    params: this.getAddRequestParams()[mode]
                },
                'Удалить все': {
                    request: new AptekiPlusAPI('').wipeAccounts,
                    params: this.getWipeRequestParams()[mode]
                },
            },
            streaks: undefined,
        }
    }

    getDumpRequest() {
        return {
            accounts: new AptekiPlusAPI('').dumpAccounts,
            streaks: undefined,
        }
    }

    getStats() {
        return new AptekiPlusAPI('').getStats;
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
            streaks: undefined,
        }
    }

    getAddRequest() {
        return {
            accounts: new AptekiPlusAPI('').createAccount,
            streaks: undefined,
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
            streaks: undefined,
        }
    }

    getAddManyRequest() {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }

    getAddManyRequestParams() {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }

    getUpdateRequest() {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }

    getUpdateRequestParams() {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }

    getDeleteRequest() {
        return {
            accounts: new AptekiPlusAPI('').deleteAccount,
            streaks: undefined,
        }
    }

    getDeleteRequestParams() {
        return {
            accounts: {
                'id': {
                    example: '1234567890',
                    type: 'string',
                    required: true,
                },
            },
            streaks: undefined,
        }
    }

    getWipeRequest() {
        return {
            accounts: new AptekiPlusAPI('').wipeAccounts,
            streaks: undefined,
        }
    }

    getWipeRequestParams() {
        return {
            accounts: {
                'confirm': {
                    example: true,
                    type: 'boolean',
                    required: true,
                },
            },
            streaks: undefined,
        }
    }

    getRefreshRequest() {
        return {
            accounts: new AptekiPlusAPI('').refreshAccount,
            streaks: undefined,
        }
    }

    getRefreshRequestParams() {
        return {
            accounts: {
                'id': {
                    example: '1234567890',
                    type: 'string',
                    required: true,
                },
            },
            streaks: undefined,
        }
    }

    getStatsRequest() {
        return new AptekiPlusAPI('').getStats;
    }

    getRelinkRequest() {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }

    getRelinkRequestParams() {
        return {
            accounts: undefined,
            streaks: undefined,
        }
    }

    getBalanceRequest() {
        return {
            accounts: new AptekiPlusAPI('').getBalance,
            streaks: undefined,
        }
    }

    getBalanceRequestParams() {
        return {
            accounts: {
                'id': {
                    example: '1234567890',
                    type: 'string',
                    required: true,
                },
            },
            streaks: undefined,
        }
    }

    getProfileRequest() {
        return {
            accounts: new AptekiPlusAPI('').getProfile,
            streaks: undefined,
        }
    }

    getProfileRequestParams() {
        return {
            accounts: {
                'id': {
                    example: '1234567890',
                    type: 'string',
                    required: true,
                },
            },
            streaks: undefined,
        }
    }

    getBalanceHistoryRequest() {
        return {
            accounts: new AptekiPlusAPI('').getBalanceHistory,
            streaks: undefined,
        }
    }

    getBalanceHistoryRequestParams() {
        return {
            accounts: {
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
            },
            streaks: undefined,
        }
    }
}