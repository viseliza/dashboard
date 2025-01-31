export type SignatureAptekiPlus = {
    url: string;
    ts?: number;
}

export type SignatureLetual = {
    url: string;
    jsession: string;
    ts?: number;
}

export type SignatureMagnit = {
    os?: string;
    version?: string;
    device_id?: string;
    phone_number: string;
    path: string;
    body?: string;
    access_token?: string;
    master_key?: string;
}

export type SignatureTashirPizza = {
    localtime?: number;
    session_id: string;
}
