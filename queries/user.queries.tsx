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

export const updateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateUserStatus"],
    mutationFn: async ({ id, status }: { id: number; status: boolean }) => {
      const res = await api.put(`/users/${id}/status`, { status });
      return res.data as UserResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const assignVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["assignVendors"],
    mutationFn: async ({
      id,
      vendorId,
      display_name,
      is_enabled,
    }: {
      id: number;
      vendorId: number;
      display_name: string;
      is_enabled: boolean;
    }) => {
      const res = await api.put(`/users/${id}/vendors`, {
        vendor_id: vendorId,
        display_name: display_name,
        is_enabled,
      });
      return res.data as UserResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
