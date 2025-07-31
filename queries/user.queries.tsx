import api from "@/lib/api";
import { UserResponse } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getUsers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: async () => {
      const res = await api.get(`/users?page=${page}&limit=${limit}`);
      return res.data as UserResponse;
    },
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};

export const updateUserStatus = (id: number, status: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateUserStatus", id, status],
    mutationFn: async () => {
      const res = await api.put(`/users/${id}/status`, { status });
      return res.data as UserResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const assignVendors = (id: number, vendorIds: number[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["assignVendors", id, vendorIds],
    mutationFn: async () => {
      const res = await api.put(`/users/${id}/vendors`, {
        vendor_ids: vendorIds,
      });
      return res.data as UserResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
