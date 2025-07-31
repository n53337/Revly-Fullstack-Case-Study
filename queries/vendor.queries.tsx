import api from "@/lib/api";
import { VendorResponse } from "@/types/vendor";
import { useQuery } from "@tanstack/react-query";


export const getVendors = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['vendors', page, limit],
        queryFn: async () => {
            const res = await api.get(`/vendors?page=${page}&limit=${limit}`);
            console.log(res.data);
            return res.data as VendorResponse;
        },
        retry: 2,
        staleTime: 1000 * 60 * 5,
    });
};