import { beforeAll } from "bun:test";
import { resetDatabase } from "../prisma/database";

beforeAll(async () => {
  if (!process.env.DATABASE_URL_TESTING) {
    console.log;
    throw new Error("DATABASE_URL_TESTING is not set.");
  }
  await resetDatabase();
  console.log("running test.");
});
