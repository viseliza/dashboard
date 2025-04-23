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
            accounts: ['enable', 'id', 'nickname', 'balance', 'mode', 'created_at', 'updated_at'],
            streaks: ['id', 'points', 'opened', 'opened_at', 'created_at', 'updated_at'],
        }
    }

    getStats() {
        return new DurakAPI('').getStats;
    }

    getActions(mode: 'accounts' | 'streaks') {
        return {
            accounts: {
                'Добавить': {
                    request: new DurakAPI('').createAccount,
                    params: this.getAddRequestParams()[mode],
                },  
                'Удалить все': {
                    request: new DurakAPI('').wipeAccounts,
                    params: this.getWipeRequestParams()[mode],
                },
            },
            streaks: {
                'Добавить': {
                    request: new DurakAPI('').createStreak,
                    params: this.getAddRequestParams()[mode],
                },
                'Добавить несколько': {
                    request: new DurakAPI('').createManyStreak,
                    params: this.getAddManyRequestParams()[mode],
                },
                'Удалить все': {
                    request: new DurakAPI('').wipeStreaks,
                    params: this.getWipeRequestParams()[mode]
                },
            },
        }
    }

    getDumpRequest() {
        return {
            accounts: new DurakAPI('').dumpAccounts,
            streaks: new DurakAPI('').dumpStreaks,
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

    getAddRequest() {
        return {
            accounts: new DurakAPI('').createAccount,
            streaks: new DurakAPI('').createStreak,
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

    getAddManyRequest() {
        return {
            accounts: undefined,
            streaks: new DurakAPI('').createManyStreak,
        }
    }

    getAddManyRequestParams() {
        return {
            accounts: undefined,
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

    getUpdateRequest() {
        return {
            accounts: new DurakAPI('').updateAccount,
            streaks: new DurakAPI('').updateStreak,
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

    getDeleteRequest() {
        return {
            accounts: new DurakAPI('').deleteAccount,
            streaks: new DurakAPI('').deleteStreak,
        }
    }

    getWipeRequest() {
        return {
            accounts: new DurakAPI('').wipeAccounts,
            streaks: new DurakAPI('').wipeStreaks,
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
            streaks: {
                'confirm': {
                    example: true,
                    type: 'boolean',
                    required: true,
                },
            },
        }
    }

    getRefreshRequest() {
        return {
            accounts: new DurakAPI('').refreshAccount,
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
        return new DurakAPI('').getStats;
    }

    getRelinkRequest() {
        return {
            accounts: undefined,
            streaks: new DurakAPI('').relinkStreaks,
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

    getBalanceRequest() {
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

    getProfileRequest() {
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

    getBalanceHistoryRequest() {
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