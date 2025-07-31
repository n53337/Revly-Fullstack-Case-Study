import api from "@/lib/api";
import { UserResponse } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

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
