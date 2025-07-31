import { relations, sql } from "drizzle-orm";
import { sqliteTable, int, text, real } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  display_name: text().notNull(),
  is_active: int().notNull().default(1),
  created_at: int()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const vendorsTable = sqliteTable("vendors", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  longitude: real().notNull(),
  latitude: real().notNull(),
  chain_id: int().references(() => chainsTable.id),
  created_at: int()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const chainsTable = sqliteTable("chains", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  created_at: int()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Many to many table

export const users_vendors = sqliteTable("users_vendors", {
  id: int().primaryKey({ autoIncrement: true }),
  display_name: text().notNull(),
  is_enabled: int().notNull().default(1),
  user_id: int()
    .references(() => usersTable.id)
    .notNull(),
  vendor_id: int()
    .references(() => vendorsTable.id)
    .notNull(),
  created_at: int()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Relationships

export const vendor_chain_relations = relations(vendorsTable, ({ one }) => ({
  chain: one(chainsTable, {
    fields: [vendorsTable.chain_id],
    references: [chainsTable.id],
  }),
}));

export const users_relations = relations(usersTable, ({ many }) => ({
  vendors: many(users_vendors),
}));

export const vendors_relations = relations(vendorsTable, ({ many }) => ({
  users: many(users_vendors),
}));

export const users_vendors_relations = relations(users_vendors, ({ one }) => ({
  user: one(usersTable, {
    fields: [users_vendors.user_id],
    references: [usersTable.id],
  }),
  vendor: one(vendorsTable, {
    fields: [users_vendors.vendor_id],
    references: [vendorsTable.id],
  }),
}));
