import dotenv from "dotenv";

interface env {
  DATABASE_URL: string;
  NODE_ENV: string;
}

function env(): env {
  if (process.env.NODE_ENV === "test") {
    dotenv.config({ path: ".env.test" });
  }
  for (const key in process.env) {
    if (key === "NODE_ENV") {
      continue;
    }
    if (process.env[key] === undefined) {
      throw new Error(`Environment variable ${key} is undefined`);
    }
  }
  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    NODE_ENV: process.env.NODE_ENV ?? "development",
  };
}

export const ENV = env();
