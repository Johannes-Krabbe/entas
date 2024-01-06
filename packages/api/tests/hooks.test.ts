import { beforeAll } from "bun:test";
import { ENV } from "../src/env";

beforeAll(async () => {
  console.log(ENV.DATABASE_URL);

  console.log("beforeAll done");
});
