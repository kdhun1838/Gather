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
exports.countVisitors = void 0;
const models_1 = __importDefault(require("../models"));
const countVisitors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    let today = new Date();
    today.setHours(23, 59, 59, 0);
    try {
        if (!req.cookies.countDate) {
            res.cookie('countDate', date, {
                expires: today,
                httpOnly: true,
            });
            const data = yield models_1.default.visitors.findOne({
                where: { date: date },
            });
            if (!data) {
                const newData = yield models_1.default.visitors.create({
                    visitor_count: 0,
                    user_count: 0,
                    total_count: 0,
                    date,
                });
                if (req.cookies.accessToken) {
                    newData.user_count++;
                    newData.total_count++;
                    res.cookie('isCounted', 1, {
                        expires: today,
                        httpOnly: true,
                    });
                }
                else {
                    newData.visitor_count++;
                    newData.total_count++;
                }
                newData.save();
            }
            else {
                if (req.cookies.accessToken) {
                    data.user_count++;
                    data.total_count++;
                    res.cookie('isCounted', 1, {
                        expires: today,
                        httpOnly: true,
                    });
                }
                else {
                    data.visitor_count++;
                    data.total_count++;
                }
                data.save();
            }
        }
        else {
            if (req.cookies.accessToken && !req.cookies.isCounted) {
                const data = yield models_1.default.visitors.findOne({
                    where: { date },
                });
                data.user_count++;
                data.visitor_count--;
                data.save();
                res.cookie('isCounted', 1, {
                    expires: today,
                    httpOnly: true,
                });
            }
        }
    }
    catch (error) {
        console.error(error);
    }
    next();
});
exports.countVisitors = countVisitors;
