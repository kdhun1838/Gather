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
const router = express_1.default.Router();
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
    limits: { fileSize: 50 * 1024 * 1024 },
});
router.post("/uploadImg", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).send("업로드실패");
    }
    console.log("하하하", req.file);
    console.log("오오오", req.body.content, req.body.link);
    const { content, link } = req.body;
    // const newCarousel = await models.carousels.findAll({});
    const newUpload = yield models_1.default.carousels.create({
        content,
        href: link,
        img: {
            filename: req.file.filename,
            url: `../../images/carousel/${req.file.filename}`,
        },
    });
    if (newUpload === null) {
        res.status(400).send("등록실패하였습니다.");
    }
    else {
        console.log("등록성공");
        res.status(200);
    }
}));
router.get("/getCarousel", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Carousel = yield models_1.default.carousels.findAll({});
    res.status(200).json(Carousel);
    try {
    }
    catch (error) {
        res.status(500);
    }
}));
router.delete("/deleteCarousel/:carouselNum", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const carouselNum = req.params.carouselNum;
    console.log("sss");
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
exports.default = router;
