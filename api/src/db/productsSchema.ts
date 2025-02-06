import { desc } from "drizzle-orm";
import { doublePrecision, text, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text().default(""),
  image: varchar({ length: 255 }).default(""),
  price: doublePrecision().notNull(),

  quantity: integer().default(0)
});

export const createProductSchema = createInsertSchema(productsTable).omit({ id: true });
export const updateProductSchema = createInsertSchema(productsTable).omit({ id: true }).partial();