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
router.get("/list", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("도착");
    try {
        const registerData = yield models_1.default.registers.findAll({});
        console.log("백 registerData===", registerData);
        res.status(200).json(registerData);
    }
    catch (error) {
        console.error(error);
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
    console.log("ddvvsvsv", postId);
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
