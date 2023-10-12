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
    console.log('login===========================', req.body);
    const { id, password } = req.body.login;
    try {
        // 데이터베이스에서 사용자 찾기
        const user = yield models_1.default.users.findOne({
            where: { id },
        });
        if (!user) {
            // 사용자가 없는 경우
            res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
            return;
        }
        // 비밀번호 검사 (실제 비밀번호 검사 로직이 필요)
        if (user.password !== password) {
            res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
            return;
        }
        // 로그인 성공 시 사용자 정보 반환
        res.status(200).json(user);
    }
    catch (error) {
        // 데이터베이스 쿼리 중 오류 발생 시
        console.error('로그인 오류:', error);
        res.status(500).json({ error: '서버 오류' });
    }
}));
router.post('/signup', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password, name, nick, email, tel, age, grade } = req.body;
    console.log('register==================', req.body);
    const agetoNum = +age;
    console.log('agetoNum==', agetoNum);
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
        });
        res.status(200).json(newSignup);
    }
    catch (error) {
        res.status(500).json(error);
        next(error);
    }
}));
exports.default = router;
