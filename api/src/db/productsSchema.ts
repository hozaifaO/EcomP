import { desc } from "drizzle-orm";
import { doublePrecision, text, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const productssTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});
