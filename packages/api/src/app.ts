import { Hono } from "hono";
import router from "./router";
import { ServiceError } from "../types/error.types";

const app = new Hono();

app.onError((err, c) => {
  if (err instanceof ServiceError) {
    return c.json(err.error, 500);
  }

  return c.json({ error: err.message }, 500);
});

app.route("", router);
export default app;
