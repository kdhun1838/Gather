"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
router.get("/list", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log("도착", req.query.data);
    try {
        const data = req.query.data;
        const mainSort = data.mainSort || "";
        const search = data.search || "";
        const time = ((_a = data.detailSort) === null || _a === void 0 ? void 0 : _a.time) || "";
        const view = ((_b = data.detailSort) === null || _b === void 0 ? void 0 : _b.view) || "";
        const like = ((_c = data.detailSort) === null || _c === void 0 ? void 0 : _c.like) || "";
        const where = {};
        let order = [["createdAt", "DESC"]];
        if (mainSort && mainSort !== "전체") {
            where.category = mainSort;
        }
        if (search) {
            where[sequelize_1.Op.or] = [
                { title: { [sequelize_1.Op.like]: `%${search}` } },
                { content: { [sequelize_1.Op.like]: `%${search}` } },
            ];
        }
        if (time === "newset") {
            order = [["createdAt", "DESC"]];
        }
        else if (time === "latest") {
            order = [["createdAt", "ASC"]];
        }
        else if (view === "highest") {
            order = [["view", "DESC"]];
        }
        else if (view === "lowest") {
            order = [["view", "ASC"]];
        }
        else if (like === "highest") {
            order = [["favorite", "DESC"]];
        }
        else if (like === "lowest") {
            order = [["favorite", "ASC"]];
        }
        const registerData = yield models_1.default.registers.findAll({
            where,
            order,
        });
        res.status(200).json(registerData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "에러" });
    }
}));
router.get("/popularList", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("인기글 백입니다.");
    try {
        const popularData = yield models_1.default.registers.findAll({
            order: [["favorite", "DESC"]],
            limit: 10,
        });
        res.status(200).json(popularData);
    }
    catch (error) {
        res.status(500).json({ error: "에러" });
    }
}));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, category, personnel, online, position, contact, content } = req.body.form;
    console.log("register 백도착", req.body, "sssssssss", title, category, personnel, online, position, contact, content);
    try {
        const newRegister = yield models_1.default.registers.create({
            title,
            category,
            personnel,
            meeting: online,
            position,
            contact,
            content,
        });
        res.status(200).json(newRegister);
    }
    catch (error) {
        res.status(500).json(error);
        next(error);
    }
}));
exports.default = router;
