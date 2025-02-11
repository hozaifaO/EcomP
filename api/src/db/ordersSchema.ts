
import { timestamp, varchar, integer, pgTable, doublePrecision } from "drizzle-orm/pg-core";
import { usersTable } from "./userSchema";
import { productsTable } from "./productsSchema";
import { createInsertSchema } from "drizzle-zod";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt : timestamp().notNull().defaultNow(),
  status : varchar({length: 50}).notNull().default("New"),
  userId: integer().references(() => usersTable.id).notNull()
});

export const orderItemsTable = pgTable("order_items", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    orderId: integer().references(() => ordersTable.id).notNull(),
    productId: integer().references(() => productsTable.id).notNull(),
    quantity: integer().notNull(),
    price: doublePrecision().notNull()

});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({id: true});