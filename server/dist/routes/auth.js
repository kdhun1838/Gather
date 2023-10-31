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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("jwtsecret", process.env.JWT_SECRET);
function getJwtSecret() {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in the environment variables.");
    }
    return jwtSecret;
}
/* GET users listing. */
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("login===========================", req.body);
    const { id, password } = req.body.login;
    try {
        // 데이터베이스에서 사용자 찾기
        const user = yield models_1.default.users.findOne({
            where: { id },
        });
        const hash = yield bcrypt_1.default.compare(password, user.password);
        if (!user) {
            // 사용자가 없는 경우
            res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
            return;
        }
        // 비밀번호 검사 (실제 비밀번호 검사 로직이 필요)
        if (!hash) {
            res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
            return;
        }
        else {
            const accessToken = jsonwebtoken_1.default.sign({
                userNum: user.userNum,
                id: user.id,
                name: user.name,
                nick: user.nick,
                email: user.email,
                tel: user.tel,
                age: user.age,
                grade: user.grade,
                addr: user.addr,
                gender: user.gender,
            }, getJwtSecret(), {
                expiresIn: "7d",
            });
            res.cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                secure: false,
                httpOnly: true,
            });
            res.status(200).json(accessToken);
        }
    }
    catch (error) {
        // 데이터베이스 쿼리 중 오류 발생 시
        console.error("로그인 오류:", error);
        res.status(500).json({ error: "서버 오류" });
    }
}));
router.post("/signup", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password, name, nick, email, tel, age, addr, gender, addr_detail, } = req.body;
    console.log("register==================", req.body);
    const agetoNum = +age;
    try {
        const User = yield models_1.default.users.findOne({ where: { id } });
        if (User) {
            console.log("중복");
            res.status(409).json("중복된 id 입니다.");
            return;
        }
        else {
            const hash = yield bcrypt_1.default.hash(password, 15);
            console.log("hash==========", hash);
            const newSignup = yield models_1.default.users.create({
                id,
                password: hash,
                name,
                nick,
                email,
                tel,
                age: agetoNum,
                grade: 1,
                addr: addr + addr_detail,
                gender,
            });
            const accessToken = jsonwebtoken_1.default.sign({
                id: newSignup.id,
                name: newSignup.name,
                nick: newSignup.nick,
                email: newSignup.email,
                tel: newSignup.tel,
                age: newSignup.age,
                grade: newSignup.grade,
                addr: newSignup.addr,
                gender: newSignup.gender,
            }, getJwtSecret(), {
                expiresIn: "7d",
            });
            console.log("accessToken", accessToken);
            res.cookie("accessToken", accessToken, {
                expires: new Date(Date.now() + 3600000),
                secure: false,
                httpOnly: true,
            });
            res.status(200).json({ accessToken });
            return;
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
    next();
}));
router.get("/check", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.cookies.accessToken;
    if (!user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    res.json(jsonwebtoken_1.default.verify(user, getJwtSecret()));
}));
router.post("/logout", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken");
    res.status(204).json("good");
}));
router.post("/userupdate", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, nick, email, tel, addr, gender } = req.body;
    try {
        const updateData = {
            name,
            nick,
            email,
            tel,
            addr,
            gender,
        };
        const [updateRows] = yield models_1.default.users.update(updateData, {
            where: { id },
        });
        const updatedUser = yield models_1.default.users.findOne({
            where: { id },
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/findid", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, tel } = req.body;
    try {
        const user = yield models_1.default.users.findOne({
            where: { email, tel },
        });
        if (!user) {
            res.status(404).json({
                error: "해당 이메일과 번호로 등록된 사용자를 찾을 수 없습니다.",
            });
            return;
        }
        res.status(200).json({ id: user.id });
    }
    catch (error) {
        console.log("ID 찾기 오류:", error);
        res.status(500).json({ error: "서버 오류" });
    }
}));
router.post("/findpassword", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const user = yield models_1.default.users.findOne({
            where: { id },
        });
        if (!user) {
            res.status(404).json({
                error: "해당 아이디로 등록된 사용자를 찾을 수 없습니다.",
            });
            return;
        }
        // 비밀번호를 재설정하는 로직을 추가해야 합니다. (예: 임시 비밀번호 생성 및 이메일로 보내기)
        // 비밀번호 재설정 기능은 보안을 고려하여 구현해야 합니다.
        res.status(200).json({ password: user.password });
    }
    catch (error) {
        console.error("비밀번호 찾기 오류:", error);
        res.status(500).json({ error: "서버 오류" });
    }
}));
exports.default = router;
