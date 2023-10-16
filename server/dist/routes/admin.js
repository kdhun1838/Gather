"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination(req, file, done) {
        done(null, "../client/src/images/carousel");
    },
    filename(req, file, done) {
        done(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 },
});
router.post("/uploadImg", (req, res) => {
    if (!req.file) {
        return res.status(400).send("업로드실패");
    }
    console.log("하하하", req.file);
    res.status(200);
});
exports.default = router;
