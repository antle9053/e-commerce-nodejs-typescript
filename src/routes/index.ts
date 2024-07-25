import express from "express";
import { accessRouter } from "./access";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).json({
    message: "Welcome to e-commerce-nodejs-typescript",
  });
});

router.use("/v1/api", accessRouter);

export { router };
