import { pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./auth";

export const notesSchema = pgSchema("notes");

export const notes = notesSchema.table("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  deletedAt: timestamp("deleted_at"),
  updatedAt: timestamp("updated_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertNoteSchema = createInsertSchema(notes, {
  title: z.string().min(1).max(100),
  content: z.string().min(1),
}).pick({ title: true, content: true });

export const updateNoteSchema = insertNoteSchema.partial();

export const selectNoteSchema = createSelectSchema(notes);

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
export type InsertNoteInput = z.infer<typeof insertNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
