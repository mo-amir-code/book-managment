"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const connectToDB_1 = require("./utils/connectToDB");
const errors_1 = require("./middlewares/errors");
const PORT = 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", routers_1.default);
app.use(errors_1.errorHandler);
app.listen(PORT, async () => {
    await (0, connectToDB_1.connectToDB)();
    console.log(`Server started at port ${PORT}`);
});
