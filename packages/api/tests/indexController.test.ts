import app from "../src/app";
import { test, expect } from "bun:test";

test("GET / => healthcheck", async () => {
  const res = await app.request("/");
  expect(res.status).toBe(200);
});

test("GET /test => create User", async () => {
  const res = await app.request("/user", { method: "POST" });
  expect(res.status).toBe(200);
});
