import { test, expect } from "bun:test";
import {
  hashPassword,
  verifyPassword,
} from "../../src/helpers/password.helper";

test("", async () => {
  const password = "test";
  const hash = await hashPassword(password);
  const wrongHash = await hashPassword("test2");

  expect(hash).not.toBe(password);
  expect(await verifyPassword(password, hash)).toBe(true);
  expect(await verifyPassword(password, wrongHash)).toBe(false);
});
