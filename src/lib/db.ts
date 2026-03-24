import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as authSchema from "@/schemas/auth";
import * as appSchema from "@/schemas/notes";
import { env } from "@/env";

const pool = new Pool({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool, {
  schema: {
    ...authSchema,
    ...appSchema,
  },
});
