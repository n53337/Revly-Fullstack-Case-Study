export type Vendor = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    chain_id: number;
    created_at: string;
};

export type VendorResponse = {
    data: Vendor[];
    total: number;
};