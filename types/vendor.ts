export type Vendor = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    chain_id: number;
    created_at: string;
    chain_name: string;
};

export type VendorResponse = {
    data: Vendor[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
};