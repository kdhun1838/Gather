"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = void 0;
const boards_1 = require("./boards"); // 소문자 모델명 사용
const users_1 = require("./users"); // 소문자 모델명 사용
function initModels(sequelize) {
    const board = (0, boards_1.boardsModel)(sequelize); // 소문자 모델명 사용
    const users = (0, users_1.usersModel)(sequelize); // 소문자 모델명 사용
    return {
        board,
        users,
    };
}
exports.initModels = initModels;
exports.default = initModels;
