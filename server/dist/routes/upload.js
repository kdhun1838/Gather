"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, done) {
            done(null, "uploads/"); //파일 저장경로, 없는 경로 입력할 경우 500 에러 발생
        },
    }),
    fileFilter: (req, file, cb) => {
        const typeArray = file.mimetype.split("/");
        const fileType = typeArray[1];
        if (fileType == "jpg" ||
            fileType == "png" ||
            fileType == "jpeg" ||
            fileType == "gif" ||
            fileType == "webp") {
            req.fileValidationError = null;
            cb(null, true);
        }
        else {
            req.fileValidationError =
                "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
            cb(null, false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 },
});
