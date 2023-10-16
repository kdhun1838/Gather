"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = void 0;
const boards_1 = require("./boards");
const users_1 = require("./users");
const registers_1 = require("./registers");
const community_1 = require("./community");
const registerComments_1 = require("./registerComments");
function initModels(sequelize) {
    const boards = (0, boards_1.boardsModel)(sequelize);
    const users = (0, users_1.usersModel)(sequelize);
    const registers = (0, registers_1.registersModel)(sequelize);
    const community = (0, community_1.communitysModel)(sequelize);
    const registerComments = (0, registerComments_1.CommentsModel)(sequelize);
    registers.hasMany(registerComments, { foreignKey: "registerNum" });
    registerComments.belongsTo(registers, { foreignKey: "registerNum" });
    return {
        boards,
        users,
        registers,
        community,
        registerComments,
    };
}
exports.initModels = initModels;
exports.default = initModels;
