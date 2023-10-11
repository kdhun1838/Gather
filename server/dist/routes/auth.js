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
const models_1 = __importDefault(require("../models")); // 수정된 부분: Users 클래스를 가져옴
/* GET users listing. */
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('login===========================');
    const { id, password } = req.body;
    try {
        const newLogin = yield models_1.default.users.findAll({
            where: { id },
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/signup', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('register==================');
    const { id, password, name, nick, email, tel, age, grade, job, career, skill, } = req.body;
    try {
        const newSignup = yield models_1.default.users.create({
            id,
            password,
            name,
            nick,
            email,
            tel,
            age,
            grade,
            job,
            career,
            skill,
        });
        res.status(200).json(newSignup);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
