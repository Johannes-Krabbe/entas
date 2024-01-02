import { Hono } from "hono";
import { prisma } from "../../prisma/database";

export const indexController = new Hono();

indexController.get("/", (c) => c.text("This is the Entas API", 200));

indexController.get("/test", async (c) => {
  const user = await prisma.user.create({
    data: {
      email: "Johannes",
      username: "johannes",
      password: "1234",
    },
  });
  return c.json(user, 200);
});
