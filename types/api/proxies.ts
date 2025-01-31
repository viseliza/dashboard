import type { Proxy } from "~/models";
import type { 
    ProxyParams, 
    ProxyAuth, 
    ProxyUpdate,
    SearchDump,
    Wipe,
    DumpData,
} from "~/types";


export type ProxyMany = {
    data: Array<ProxyBase>;
}

export type ProxyDump = {
    length: any;
    data: Array<ProxyParams>;
    count: number;
}

export type ProxyWipeAnser = {
    status: string;
}

export type ProxyBase = {
    host: string;
    port: number;
    auth: ProxyAuth;
    update: ProxyUpdate;
    type: string;
    mode: string;
    checkInternet: boolean;
    enable: boolean;
}


export interface IProxyAPI {
    create(body: ProxyBase, access_token: string): Promise<Proxy>;
    createMany(body: ProxyMany, access_token: string): Promise<DumpData<Proxy>>;
    dump(params: SearchDump, access_token: string): Promise<DumpData<Proxy>>;
    get(id: string, access_token: string): Promise<Proxy>;
    update(data: { id: string, body: ProxyBase }, access_token: string): Promise<Proxy>;
    delete(id: string, access_token: string): Promise<Proxy>;
    wipe(opts: Wipe, access_token: string): Promise<ProxyWipeAnser>;
}
