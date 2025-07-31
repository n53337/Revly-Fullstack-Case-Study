import { mockChains, mockUsers, mockVendors } from "@/lib/data";
import db from ".";
import { chainsTable, usersTable, vendorsTable } from "./schema";

const seed = async () => {
    try {
        
    // Users Seed
    console.log('Seeding Users...');
    await db.insert(usersTable).values(mockUsers);

    // Chains Seed
    console.log('Seeding Chains...');
    await db.insert(chainsTable).values(mockChains);

    // Vendors Seed
    console.log('Seeding Vendors...');
    await db.insert(vendorsTable).values(mockVendors);

    console.log('Seeding Completed Successfully');

    } catch (error: any) {
        console.error("Failed to seed the database", error.message);
    }
};

seed();