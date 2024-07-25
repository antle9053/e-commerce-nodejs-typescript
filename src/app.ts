import { router } from "./routes";

require("dotenv").config();
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

export const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);
