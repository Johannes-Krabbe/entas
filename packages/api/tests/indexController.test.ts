import app from "../src/app";
import { test, expect } from "bun:test";

test("GET /hello is ok", async () => {
  const res = await app.request("/hello");
  expect(res.status).toBe(200);
});
