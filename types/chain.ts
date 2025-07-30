export type Chain = {
    id: number;
    name: string;
    created_at: string;
};

export type ChainResponse = {
    data: Chain[];
    total: number;
};