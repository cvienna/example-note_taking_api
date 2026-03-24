import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { type NewNote, notes } from "@/schemas/notes";

export async function getNotesByUser(userId: string) {
  return await db
    .select()
    .from(notes)
    .where(and(eq(notes.userId, userId), isNull(notes.deletedAt)));
}

export async function getNoteById(id: string, userId: string) {
  const result = await db
    .select()
    .from(notes)
    .where(
      and(eq(notes.id, id), eq(notes.userId, userId), isNull(notes.deletedAt)),
    )
    .limit(1);

  return result[0] ?? null;
}

export async function createNote(data: NewNote) {
  const result = await db.insert(notes).values(data).returning();
  return result[0];
}

export async function updateNote(
  id: string,
  userId: string,
  data: Partial<NewNote>,
) {
  const result = await db
    .update(notes)
    .set({ ...data, updatedAt: new Date() })
    .where(
      and(eq(notes.id, id), eq(notes.userId, userId), isNull(notes.deletedAt)),
    )
    .returning();
  return result[0] ?? null;
}

export async function softDeleteNote(id: string, userId: string) {
  const result = await db
    .update(notes)
    .set({ deletedAt: new Date() })
    .where(
      and(eq(notes.id, id), eq(notes.userId, userId), isNull(notes.deletedAt)),
    )
    .returning();

  return result[0] ?? null;
}
