import express from "express";
import { AccessController } from "../../controllers/access.controller";

const accessRouter = express.Router();

accessRouter.post("/shop/register", AccessController.register);

export { accessRouter };
