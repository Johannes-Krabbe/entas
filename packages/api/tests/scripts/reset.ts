import { resetDatabase } from "../../prisma/database";

if (!process.env.DATABASE_URL_TESTING) {
  console.log;
  throw new Error("DATABASE_URL_TESTING is not set.");
}
await resetDatabase();
console.log("running test.");
