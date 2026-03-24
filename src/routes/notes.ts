import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { AppError } from "@/errors";
import { getSession } from "@/middleware";
import {
  createNote,
  getNoteById,
  getNotesByUser,
  softDeleteNote,
  updateNote,
} from "@/repository/notes";
import { ok } from "@/response";
import { insertNoteSchema, updateNoteSchema } from "@/schemas/notes";

const notes = new Hono();

notes.get("/", async (c) => {
  const session = await getSession(c);
  const notes = await getNotesByUser(session.user.id);
  return ok(c, notes, 200);
});
notes.get(
  "/:id",
  zValidator("param", z.object({ id: z.uuid() })),
  async (c) => {
    const { id } = c.req.valid("param");
    const session = await getSession(c);
    const note = await getNoteById(id, session.user.id);
    if (!note) throw new AppError(404, "Note not found");
    return ok(c, note, 200);
  },
);
notes.post("/", zValidator("json", insertNoteSchema), async (c) => {
  const session = await getSession(c);
  const body = c.req.valid("json");
  const note = await createNote({ ...body, userId: session.user.id });
  return ok(c, note, 201);
});
notes.patch(
  "/:id",
  zValidator("param", z.object({ id: z.uuid() })),
  zValidator("json", updateNoteSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const session = await getSession(c);
    const body = c.req.valid("json");
    const note = await updateNote(id, session.user.id, body);
    if (!note) throw new AppError(404, "Note not found");
    return ok(c, note, 200);
  },
);
notes.delete(
  "/:id",
  zValidator("param", z.object({ id: z.uuid() })),
  async (c) => {
    const { id } = c.req.valid("param");
    const session = await getSession(c);
    const note = await softDeleteNote(id, session.user.id);
    if (!note) throw new AppError(404, "Note not found");
    return ok(c, null, 200); // 204 instead of 200, ContentlessStatusCode
  },
);

export default notes;
