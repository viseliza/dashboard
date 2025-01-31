import type { 
    ServiceItem,
    Tokens,
    AuthLogin
} from "~/models";

export interface IPennoeAPI {
    authorize(authLogin: AuthLogin): Promise<Tokens>;
    getServices(params: any, access_token: string): Promise<ServiceItem[]>;
}
