import { PrismaClient } from "@prisma/client";

let client;

if (process.env.NODE_ENV === "test") {
  client = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL_TESTING,
  });
} else {
  client = new PrismaClient();
}

export const prisma = client;

export const resetDatabase = async () => {
  const proc = Bun.spawn(["bun", "db:resetTesting"]);
  await proc.exited;
};
