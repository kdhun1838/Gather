"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = void 0;
const boards_1 = require("./boards"); // 소문자 모델명 사용
const users_1 = require("./users"); // 소문자 모델명 사용
const registers_1 = require("./registers");
function initModels(sequelize) {
    const boards = (0, boards_1.boardsModel)(sequelize); // 소문자 모델명 사용
    const users = (0, users_1.usersModel)(sequelize); // 소문자 모델명 사용
    const registers = (0, registers_1.registersModel)(sequelize);
    return {
        boards,
        users,
        registers,
    };
}
exports.initModels = initModels;
exports.default = initModels;
