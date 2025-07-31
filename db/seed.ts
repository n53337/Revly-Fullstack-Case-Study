// src/lib/db/seed.js
import { mockChains, mockUsers, mockVendors } from "@/lib/data";
import db from ".";
import { chainsTable, usersTable, vendorsTable } from "./schema";

const seed = async () => {
  try {
    console.log("Starting seeding...");

    // Check if already seeded
    const existingUsers = await db.select().from(usersTable).limit(1);
    if (existingUsers.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    // Users Seed
    console.log("Seeding Users...");
    await db.insert(usersTable).values(mockUsers);

    // Chains Seed
    console.log("Seeding Chains...");
    await db.insert(chainsTable).values(mockChains);

    // Vendors Seed
    console.log("Seeding Vendors...");
    await db.insert(vendorsTable).values(mockVendors);

    console.log("Seeding Completed Successfully");
  } catch (error: any) {
    console.error("Failed to seed the database:", error.message);
  }
};

seed();
