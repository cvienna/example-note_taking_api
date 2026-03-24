import { Hono } from "hono";
import { auth } from "@/lib/auth";

const betterAuth = new Hono();

betterAuth.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));

export default betterAuth;
