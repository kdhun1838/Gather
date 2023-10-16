"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("Mo2Da", "root", "edurootroot", {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "mysql",
});
auto.run();
