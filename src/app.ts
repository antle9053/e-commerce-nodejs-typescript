import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

export const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.get("/", (req: express.Request, res: express.Response) => {
  const message = "Hello World";
  return res.status(200).json({
    message: message.repeat(20000),
  });
});
