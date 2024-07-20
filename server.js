"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const PORT = process.env.PORT || 4100;
const server = app_1.app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
process.on("SIGINT", () => {
    server.close(() => console.log("Server closed"));
});
