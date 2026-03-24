import "dotenv/config";

export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export const env = {
  PORT: parseInt(requireEnv("PORT")),

  BETTER_AUTH_URL: requireEnv("BETTER_AUTH_URL"),
  BETTER_AUTH_SECRET: requireEnv("BETTER_AUTH_SECRET"),

  DATABASE_HOST: requireEnv("DATABASE_HOST"),
  DATABASE_PORT: parseInt(requireEnv("DATABASE_PORT")),
  DATABASE_USER: requireEnv("DATABASE_USER"),
  DATABASE_PASSWORD: requireEnv("DATABASE_PASSWORD"),
  DATABASE_NAME: requireEnv("DATABASE_NAME"),
};
