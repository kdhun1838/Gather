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
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("하이");
    try {
        const usersData = yield models_1.default.users.findAll({}); // Users 클래스를 사용
        res.status(200).json(usersData);
        // console.log(usersData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
}));
exports.default = router;
