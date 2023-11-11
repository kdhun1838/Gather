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
const node_cron_1 = __importDefault(require("node-cron"));
const router = express_1.default.Router();
//메인
router.get("/getMessages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield models_1.default.messages.findAll({
            where: {
                state: 0,
            },
            include: [
                {
                    model: models_1.default.users,
                    attributes: ["nick", "grade"],
                },
            ],
            order: [["createdAt", "DESC"]],
            limit: 6,
        });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500);
    }
}));
router.post("/postMessages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, userNum } = req.body;
        const data = yield models_1.default.messages.create({
            content: text,
            userNum,
        });
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500);
    }
}));
router.post("/postDelete/:messageNum", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageNum = req.params.messageNum;
        console.log("번호", messageNum);
        const deleteData = yield models_1.default.messages.update({ state: 1 }, {
            where: { messageNum },
        });
        res.status(200).json(deleteData);
    }
    catch (error) {
        res.status(500);
    }
}));
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
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        const data = yield models_1.default.visitors.findAll({
            where: {
                date: {
                    [sequelize_1.Op.between]: [oneWeekAgo, today],
                },
            },
            order: [["date", "ASC"]],
        });
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500);
    }
}));
router.get("/weekRegister", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const oneWeekAgo = new Date(currentDate);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
        const registerData = yield models_1.default.registers.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [oneWeekAgo, currentDate],
                },
            },
        });
        const registerFormatData = registerData.map((item) => (Object.assign(Object.assign({}, item.dataValues), { createdAt: new Date(item.createdAt.getTime()).toISOString().slice(0, 10) })));
        const communityData = yield models_1.default.communitys.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [oneWeekAgo, currentDate],
                },
            },
        });
        const communityFormatData = communityData.map((item) => (Object.assign(Object.assign({}, item.dataValues), { createdAt: new Date(item.createdAt.getTime()).toISOString().slice(0, 10) })));
        const userData = yield models_1.default.users.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [oneWeekAgo, currentDate],
                },
            },
        });
        const userFormatData = userData.map((item) => (Object.assign(Object.assign({}, item.dataValues), { createdAt: new Date(item.createdAt.getTime()).toISOString().slice(0, 10) })));
        const dateCounts = {};
        for (let i = new Date(oneWeekAgo); i <= currentDate; i.setDate(i.getDate() + 1)) {
            const formattedDate = new Date(i.getTime()).toISOString().slice(0, 10);
            dateCounts[formattedDate] = {
                registerDataCount: registerFormatData.filter((item) => item.createdAt === formattedDate).length,
                communityDataCount: communityFormatData.filter((item) => item.createdAt === formattedDate).length,
                userDataCount: userFormatData.filter((item) => item.createdAt === formattedDate).length,
            };
        }
        let totalRegisterDataCount = 0;
        let totalCommunityDataCount = 0;
        let totalUserDataCount = 0;
        for (let i = 0; i < 7; i++) {
            const formattedDate = new Date(oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000)
                .toISOString()
                .slice(0, 10);
            totalRegisterDataCount += dateCounts[formattedDate].registerDataCount;
            totalCommunityDataCount += dateCounts[formattedDate].communityDataCount;
            totalUserDataCount += dateCounts[formattedDate].userDataCount;
        }
        const result = Object.keys(dateCounts)
            .sort()
            .reverse()
            .map((date) => ({
            date,
            registerDataCount: dateCounts[date].registerDataCount,
            communityDataCount: dateCounts[date].communityDataCount,
            userDataCount: dateCounts[date].userDataCount,
        }));
        result.push({
            date: "최근 7일 합계",
            registerDataCount: totalRegisterDataCount,
            communityDataCount: totalCommunityDataCount,
            userDataCount: totalUserDataCount,
        });
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
// 캐러셀 관리
const uniqueFileName = (name) => {
    const timestamp = Date.now();
    return `${timestamp}-00.jpg`;
};
const storage = multer_1.default.diskStorage({
    destination(req, file, done) {
        done(null, "../client/public");
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
            url: `../../images/${req.file.filename}`,
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
router.get("/getUserDetail/:userNum", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userNum = req.params.userNum;
    try {
        const User = yield models_1.default.users.findOne({ where: { userNum } });
        const data = {
            id: User.id,
            name: User.name,
            nick: User.nick,
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
router.get("/getRegisterChart/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sport = yield models_1.default.registers.count({
            where: { category: "운동" },
        });
        const game = yield models_1.default.registers.count({
            where: { category: "게임" },
        });
        const study = yield models_1.default.registers.count({
            where: { category: "스터디" },
        });
        const etc = yield models_1.default.registers.count({
            where: { category: "기타" },
        });
        const data = [
            { id: "운동", value: sport },
            { id: "게임", value: game },
            { id: "스터디", value: study },
            { id: "기타", value: etc },
        ];
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500);
    }
}));
router.get("/getRegisterChart/month", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentYear = new Date().getFullYear();
        const monthlyData = [];
        for (let month = 1; month <= 12; month++) {
            const startDate = new Date(`${currentYear}-${month}-01`);
            const endDate = new Date(currentYear, month, 0, 23, 59, 59, 999);
            const sportCount = yield models_1.default.registers.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "운동",
                },
            });
            const studyCount = yield models_1.default.registers.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "스터디",
                },
            });
            const gameCount = yield models_1.default.registers.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "게임",
                },
            });
            const etcCount = yield models_1.default.registers.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "기타",
                },
            });
            monthlyData.push({
                id: `${month}월`,
                운동: sportCount,
                스터디: studyCount,
                게임: gameCount,
                기타: etcCount,
            });
        }
        res.status(200).json(monthlyData);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.get("/getRegisterChart/day", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const oneWeekAgo = new Date(currentDate);
        oneWeekAgo.setDate(currentDate.getDate() - 6); // 일주일 전부터 오늘까지
        const dailyData = [];
        for (let day = 0; day < 7; day++) {
            const date = new Date(oneWeekAgo);
            date.setDate(oneWeekAgo.getDate() + day);
            const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일(${getDayName(date)})`;
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0); // 날짜의 시작 시간
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999); // 날짜의 끝 시간
            const sportCount = yield models_1.default.registers.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "운동",
                },
            });
            const studyCount = yield models_1.default.registers.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "스터디",
                },
            });
            const gameCount = yield models_1.default.registers.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "게임",
                },
            });
            const etcCount = yield models_1.default.registers.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "기타",
                },
            });
            dailyData.push({
                id: formattedDate,
                운동: sportCount,
                스터디: studyCount,
                게임: gameCount,
                기타: etcCount,
            });
        }
        console.log("ddd", dailyData);
        res.status(200).json(dailyData);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
function getDayName(date) {
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    return dayNames[date.getDay()];
}
// 커뮤니티 관리
router.get("/getCommunity", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.get("/getCommunityChart/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield models_1.default.communitys.count({
            where: { category: "후기" },
        });
        const question = yield models_1.default.communitys.count({
            where: { category: "질문" },
        });
        const etc = yield models_1.default.communitys.count({
            where: { category: "잡담" },
        });
        const data = [
            { id: "후기", value: review },
            { id: "질문", value: question },
            { id: "잡담", value: etc },
        ];
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500);
    }
}));
router.get("/getCommunityChart/month", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentYear = new Date().getFullYear();
        const monthlyData = [];
        for (let month = 1; month <= 12; month++) {
            const startDate = new Date(`${currentYear}-${month}-01`);
            const endDate = new Date(currentYear, month, 0, 23, 59, 59, 999);
            const chatCount = yield models_1.default.communitys.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "잡담",
                },
            });
            const askCount = yield models_1.default.communitys.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "질문",
                },
            });
            const reviewCount = yield models_1.default.communitys.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "후기",
                },
            });
            monthlyData.push({
                id: `${month}월`,
                잡담: chatCount,
                질문: askCount,
                후기: reviewCount,
            });
        }
        res.status(200).json(monthlyData);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.get("/getCommunityChart/day", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const oneWeekAgo = new Date(currentDate);
        oneWeekAgo.setDate(currentDate.getDate() - 6);
        const dailyData = [];
        for (let day = 0; day < 7; day++) {
            const date = new Date(oneWeekAgo);
            date.setDate(oneWeekAgo.getDate() + day);
            const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일(${getDayName(date)})`;
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            const chatCount = yield models_1.default.communitys.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "잡담",
                },
            });
            const askCount = yield models_1.default.communitys.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "질문",
                },
            });
            const reviewCount = yield models_1.default.communitys.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: startDate,
                        [sequelize_1.Op.lte]: endDate,
                    },
                    category: "후기",
                },
            });
            dailyData.push({
                id: formattedDate,
                잡담: chatCount,
                질문: askCount,
                후기: reviewCount,
            });
        }
        console.log("ddd", dailyData);
        res.status(200).json(dailyData);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// 시간체크 후 자동마감함수
const createOrUpdateVisitorRecord = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const currentDateString = new Date(currentDate.getTime() + 9 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];
        const existingRecord = yield models_1.default.visitors.findOne({
            where: { date: currentDateString },
        });
        if (existingRecord) {
            console.log(`이미 레코드가 존재합니다. date: ${currentDateString}`);
        }
        else {
            const newVisitorRecord = {
                visitor_count: 0,
                user_count: 0,
                total_count: 0,
                date: currentDateString,
            };
            yield models_1.default.visitors.create(newVisitorRecord);
            console.log(`새로운 레코드를 추가했습니다. date: ${currentDateString}`);
        }
    }
    catch (e) {
        console.error("오류가 발생했습니다:", e);
    }
});
node_cron_1.default.schedule("0 0 * * *", () => {
    createOrUpdateVisitorRecord();
});
exports.default = router;
