import { app } from "./src/app";

const PORT = process.env.PORT || 4100;

const server = app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Server closed"));
});
