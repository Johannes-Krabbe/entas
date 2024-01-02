import app from "../src/app";
import { test, expect } from "bun:test";

test("GET / => healthcheck", async () => {
  const res = await app.request("/");
  expect(res.status).toBe(200);
});
