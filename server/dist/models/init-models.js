"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = void 0;
const board_1 = require("./board");
const user_1 = require("./user");
function initModels(sequelize) {
    const board = (0, board_1.BoardModel)(sequelize);
    const user = (0, user_1.UserModel)(sequelize);
    return {
        board,
        user,
    };
}
exports.initModels = initModels;
exports.default = initModels;
