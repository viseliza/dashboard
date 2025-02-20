export interface ISignature {
    use(name: string, strategy: SignatureStrategy): void;
    getParams(name: string, args: any | undefined): Record<string, any>;
}

export interface SignatureStrategy {
    getTitle(): string;
    getParams(args: any | undefined): Record<string, any>;
    getDescription(): string;
    getStyle(): { icon: string | null, color: string | null };
}
