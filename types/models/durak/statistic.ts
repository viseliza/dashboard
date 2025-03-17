export interface StatisticData {
    accounts: StatAccountData;
    balance: StatBalanceData;
    streaks: StatStreaksData;
}

export type StatStreaksData = {
    not_opened: number;
    opened:     number;
}

export type StatAccountData = {
    last_updated_account_at: number,
    total: number,
    with_balance: number
}

export type StatBalanceData = {
    max_balance: number,
    min_balance: number
}