export type User = {
    id: number;
    email: string;
    display_name: string;
    is_active: number;
    created_at: string;
};

export type UserResponse = {
    data: User[];
    total: number;
};
