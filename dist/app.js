"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./models/server"));
const dotenv_1 = require("dotenv");
// Allow enviroment vasriables
(0, dotenv_1.config)();
// Init Server
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map