
export type ProxyParams = {
    id: string;
    host: string;
    port: number;
    auth: ProxyAuth;
    update: ProxyUpdate;
    type: ProxyType;
    mode: ProxyMode;
    checkInternet: boolean;
    enable: boolean;
    created_at: number;
    updated_at: number;
}


export type ProxyAuth = {
    enable: boolean;
    username: string | null;
    password: string | null;
}


export type ProxyUpdate = {
    enable: boolean;
    link: string | null;
    seconds: number | null;
}

export type ProxyMode = 'streaks' | 'refresher';

export type ProxyType = 'http' | 'https' | 'socks4' | 'socks5';

