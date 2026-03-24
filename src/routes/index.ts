import { Hono } from "hono";
import auth from "./auth";
import notes from "./notes";

const app = new Hono();

app.route("/auth", auth);
app.route("/notes", notes);

export default app;
