export type LoaderModel = {
    active: boolean;
    process: boolean;
    status: string;
    description: string | null;
    data: any | null;
    task: string | null;
    model: string;
    resultDetail: any | null;
}