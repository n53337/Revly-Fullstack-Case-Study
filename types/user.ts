export type User = {
  id: number;
  email: string;
  display_name: string;
  is_active: number;
  created_at: string;
  vendors: {
    id: number;
    display_name: string;
  }[];
};

export type UserResponse = {
  data: User[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
};
