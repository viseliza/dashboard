// Create streak types
export type StreakCreate = {
    points: number;
}

export type StreakCreateMany = {
    points: number;
    count: number;   
}

export type StreakCreateManyResult = {
    data: string[];
    count: number;
    points: number;
}


// Update streak types
export type StreakUpdate = {
    id: string;
    points: number;
}


// Streak model type
export interface IStreak {
    id: string;
    points: number;
    opened?: boolean;
    opened_at?: number;
    created_at?: number;
    updated_at?: number;   
}

export interface IStreakUpdate {
    id: string;
    points: number;
}

export interface IStreakCreate {
    points: number;
}

export interface IStreakCreateMany {
    points: number;
    count: number;
}