import { Hono } from "hono";
import { indexController } from "./controllers/indexController";

const router = new Hono();

router.route("/", indexController);

export default router;
