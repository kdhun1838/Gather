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
    try {
        const data = req.query.data;
        const mainSort = data.mainSort || "";
        const search = data.search || "";
        const time = ((_a = data.detailSort) === null || _a === void 0 ? void 0 : _a.time) || "";
        const view = ((_b = data.detailSort) === null || _b === void 0 ? void 0 : _b.view) || "";
        const like = ((_c = data.detailSort) === null || _c === void 0 ? void 0 : _c.like) || "";
        let where = {};
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
    const { title, category, personnel, online, position, contact, period, content, } = req.body.form;
    // console.log(
    //   "register 백도착",
    //   req.body,
    //   "sssssssss",
    //   title,
    //   category,
    //   personnel,
    //   online,
    //   position,
    //   contact,
    //   period,
    //   content
    // );
    try {
        const newRegister = yield models_1.default.registers.create({
            title,
            category,
            personnel,
            meeting: online,
            position,
            contact,
            period,
            content,
        });
        res.status(200).json(newRegister);
    }
    catch (error) {
        res.status(500).json(error);
        next(error);
    }
}));
router.get("/post/:postId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.query;
    try {
        const getFormData = yield models_1.default.registers.findOne({
            where: { registerNum: postId },
        });
        getFormData.view += 1;
        yield getFormData.save();
        res.status(200).json(getFormData);
    }
    catch (e) {
        console.error(e);
    }
}));
router.post("/close/:postId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.body.postId; // req.params를 사용하여 URL 파라미터 가져옴
    try {
        const postClose = yield models_1.default.registers.update({ state: 2, updatedAt: new Date() }, {
            where: { registerNum: postId },
        });
        res.status(200).json(postClose);
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}));
router.post("/delete/:postId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.body.postId; // req.params를 사용하여 URL 파라미터 가져옴
    console.log("22222222222222", postId);
    try {
        const postDelete = yield models_1.default.registers.destroy({
            where: { registerNum: postId },
        });
        res.status(200).json(postDelete);
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}));
exports.default = router;
