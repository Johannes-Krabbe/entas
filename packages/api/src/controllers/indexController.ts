import { Hono } from "hono";

export const indexController = new Hono();

indexController.get("/", (c) => c.text("This is the Entas API", 200));
