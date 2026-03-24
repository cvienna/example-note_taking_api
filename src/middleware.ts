import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { auth } from "@/lib/auth";
import { AppError } from "./errors";

export async function getSession(c: Context) {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) throw new AppError(401, "Unauthorized");
  return session;
}

export const errorMiddleware = (err: Error, c: Context) => {
  if (err instanceof AppError) {
    return c.json(
      { success: false, error: err.message },
      err.statusCode as ContentfulStatusCode,
    );
  }

  return c.json({ success: false, error: "Internal server error" }, 500);
};
