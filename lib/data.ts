export const mockUsers = [
    {
        id: 1,
        email: "john.doe@mail.com",
        display_name: "John Doe",
        is_active: 1,
    },
    {
        id: 2,
        email: "natasha.smith@mail.com",
        display_name: "Natasha Smith",
        is_active: 1,
    },
];

export const mockChains = [
    {
        id: 1,
        name: "The Healthy Brand",
    },
    {
        id: 2,
        name: "Tasty Burgers",
    },
    {
        id: 3,
        name: "The Pizza House"
    }
];

export const mockVendors = [
    {
        id: 1,
        chain_id: 1,
        name: "The Healthy Brand - Business Bay",
        longitude: 55.279824,
        latitude: 25.219511,
    },
    {
        id: 2,
        chain_id: 1,
        name: "The Healthy Brand - Downtown",
        longitude: 55.2798,
        latitude: 25.21992,
    },
    {
        id: 3,
        chain_id: 2,
        name: "Tasty Burgers - Business Bay",
        longitude: 55.159214,
        latitude: 25.0941429,
    },
    {
        id: 4,
        chain_id: 3,
        name: "The Pizza House - Business Bay",
        longitude: 55.1592144,
        latitude: 25.0941431
    },
];