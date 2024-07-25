import { app } from "./src/app";
import { configs } from "./src/configs";

const { port } = configs;

const server = app.listen(port, () => {
  console.log("Listening on port " + port);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Server closed"));
});
