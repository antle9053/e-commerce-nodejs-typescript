"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
exports.app = (0, express_1.default)();
exports.app.use((0, morgan_1.default)("dev"));
exports.app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello World",
    });
});
