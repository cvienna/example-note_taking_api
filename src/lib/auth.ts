import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import * as authSchema from "@/schemas/auth";
import { db } from "./db";
import { env } from "@/env";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...authSchema },
    usePlural: true,
  }),
  secret: env.BETTER_AUTH_SECRET,
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60,
    cookieCache: {
      enabled: false,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI()],
});
