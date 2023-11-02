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
const models_1 = __importDefault(require("../models"));
const multer_1 = __importDefault(require("multer"));
const sequelize_1 = require("sequelize");
const router = express_1.default.Router();
//메인
router.get("/topInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield models_1.default.users.findAndCountAll({
            attributes: {
                exclude: ["password"],
            },
            nest: true,
        });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const userDataToday = yield models_1.default.users.count({
            where: {
                createdAt: {
                    [sequelize_1.Op.gte]: today,
                },
            },
        });
        userData.today = userDataToday;
        const registerData = yield models_1.default.registers.findAndCountAll({
            nest: true,
        });
        const registerDataToday = yield models_1.default.registers.count({
            where: {
                createdAt: {
                    [sequelize_1.Op.gte]: today,
                },
            },
        });
        registerData.today = registerDataToday;
        const communityData = yield models_1.default.communitys.findAndCountAll({
            nest: true,
        });
        const communityDataToday = yield models_1.default.communitys.count({
            where: {
                createdAt: {
                    [sequelize_1.Op.gte]: today,
                },
            },
        });
        communityData.today = communityDataToday;
        const carouselData = yield models_1.default.carousels.findAndCountAll({
            nest: true,
        });
        const carouselDataToday = yield models_1.default.carousels.count({
            where: {
                createdAt: {
                    [sequelize_1.Op.gte]: today,
                },
            },
        });
        carouselData.today = carouselDataToday;
        res
            .status(200)
            .json({ userData, registerData, communityData, carouselData });
    }
    catch (error) {
        res.status(500);
    }
}));
router.get("/visitor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("방문자백");
    try {
        const data = yield models_1.default.visitors.findAll({});
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500);
    }
}));
// 캐러셀 관리
const uniqueFileName = (name) => {
    const timestamp = Date.now();
    return `${timestamp}-00`;
};
const storage = multer_1.default.diskStorage({
    destination(req, file, done) {
        done(null, "../client/public/carousel");
    },
    filename(req, file, done) {
        done(null, uniqueFileName(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 500 * 1024 * 1024 },
});
router.post("/uploadImg", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).send("업로드실패");
    }
    const { content, link, backgroundColor, textColor, onlyImg } = req.body;
    // const newCarousel = await models.carousels.findAll({});
    const newUpload = yield models_1.default.carousels.create({
        content,
        href: link,
        img: {
            filename: req.file.filename,
            url: `../../images/carousel/${req.file.filename}`,
        },
        backgroundColor,
        textColor,
        onlyImg: Number(onlyImg),
    });
    if (newUpload === null) {
        res.status(400).send("등록실패하였습니다.");
    }
    else {
        res.status(200);
    }
}));
router.get("/getCarousel", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Carousel = yield models_1.default.carousels.findAll({});
    try {
        res.status(200).json(Carousel);
    }
    catch (error) {
        res.status(500);
    }
}));
router.post("/clickCarousel", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const carouselNum = req.body.carouselNum;
    try {
        const data = yield models_1.default.carousels.findOne({
            where: { carouselNum },
        });
        data.count += 1;
        yield data.save();
        res.status(200);
    }
    catch (error) {
        res.status(500);
    }
}));
router.post("/updateCarousel/", upload.single("file"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { content, link, carouselNum, backgroundColor, textColor, onlyImg } = req.body;
    try {
        yield models_1.default.carousels.update({
            content,
            href: link,
            img: {
                filename: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
                url: `../../images/carousel/${(_b = req.file) === null || _b === void 0 ? void 0 : _b.filename}`,
            },
            backgroundColor,
            textColor,
            onlyImg: Number(onlyImg),
        }, { where: { carouselNum } });
        res.status(200);
    }
    catch (error) {
        res.status(500);
    }
}));
router.delete("/deleteCarousel/:carouselNum", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const carouselNum = req.params.carouselNum;
    try {
        yield models_1.default.carousels.destroy({
            where: { carouselNum },
        });
        res.status(200);
    }
    catch (error) {
        res.status(500);
    }
}));
//유저관리
router.delete("/deleteUser/:userNum", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userNum = req.params.userNum;
    try {
        yield models_1.default.users.destroy({
            where: { userNum: Number(userNum) },
        });
        res.status(200);
    }
    catch (error) {
        res.status(500);
    }
}));
router.post("/updateUserGrade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userNum, grade } = req.body;
    console.log("백 userNum", userNum, "grade", grade);
    try {
        if (grade === 2) {
            yield models_1.default.users.update({
                grade: 1,
            }, { where: { userNum: Number(userNum) } });
        }
        else if (grade === 1) {
            yield models_1.default.users.update({
                grade: 2,
            }, { where: { userNum: Number(userNum) } });
        }
    }
    catch (error) {
        res.status(500);
    }
}));
exports.default = router;
router.get("/getUserDetail/:userNum", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("디테일 백", req.params.userNum);
    const userNum = req.params.userNum;
    try {
        const User = yield models_1.default.users.findOne({ where: { userNum } });
        const data = {
            id: User.id,
            name: User.name,
            nick: User.email,
            email: User.email,
            tel: User.tel,
            age: User.age,
            grade: User.grade,
            addr: User.addr,
            gender: User.gender,
        };
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500);
    }
}));
//모임게시판 관리
router.get("/getRegister", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.default.registers.findAll({
            include: [
                {
                    nest: true,
                    model: models_1.default.users,
                    attributes: ["id", "nick", "name"],
                },
            ],
        });
        const transformedData = data.map((item) => {
            const user = item.User;
            const restOfData = {
                id: user.id,
                nick: user.nick,
                name: user.name,
                category: item.category,
                contact: item.contact,
                content: item.content,
                createdAt: item.createdAt,
                favorite: item.favorite,
                meeting: item.meeting,
                period: item.period,
                personnel: item.personnel,
                position: item.position,
                registerNum: item.registerNum,
                state: item.state,
                title: item.title,
                updatedAt: item.updatedAt,
                userNum: item.userNum,
                view: item.view,
            };
            return restOfData;
        });
        res.status(200).json(transformedData);
    }
    catch (error) {
        res.status(500);
    }
}));
// 커뮤니티 관리
router.get("/getCommunity", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getCommunity백");
    try {
        const data = yield models_1.default.communitys.findAll({
            include: [
                {
                    nest: true,
                    model: models_1.default.users,
                    attributes: ["id", "nick", "name"],
                },
            ],
        });
        const transformedData = data.map((item) => {
            const user = item.User;
            const restOfData = {
                communityNum: item.communityNum,
                id: user.id,
                nick: user.nick,
                name: user.name,
                userNum: item.userId,
                title: item.title,
                category: item.category,
                content: item.content,
                detail: item.detail,
                view: item.view,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            };
            return restOfData;
        });
        res.status(200).json(transformedData);
    }
    catch (error) {
        res.status(500);
    }
}));
