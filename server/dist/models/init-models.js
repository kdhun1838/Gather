"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = void 0;
const boards_1 = require("./boards");
const users_1 = require("./users");
const registers_1 = require("./registers");
const communitys_1 = require("./communitys");
const communityComments_1 = require("./communityComments");
const registerComments_1 = require("./registerComments");
function initModels(sequelize) {
    const boards = (0, boards_1.boardsModel)(sequelize);
    const users = (0, users_1.usersModel)(sequelize);
    const registers = (0, registers_1.registersModel)(sequelize);
    const communitys = (0, communitys_1.communitysModel)(sequelize);
    const communityComments = (0, communityComments_1.communityCommentsModel)(sequelize);
    const registerComments = (0, registerComments_1.RegisterCommentsModel)(sequelize);
    registers.hasMany(registerComments, { foreignKey: "registerNum" });
    registerComments.belongsTo(registers, { foreignKey: "registerNum" });
    users.hasMany(registerComments, { foreignKey: "userId" });
    registerComments.belongsTo(users, { foreignKey: "userId" });
    users.hasMany(registers, { foreignKey: "userNum" });
    registers.belongsTo(users, { foreignKey: "userNum" });
    users.hasMany(communityComments, { foreignKey: "userId" });
    communityComments.belongsTo(users, { foreignKey: "userId" });
    return {
        boards,
        users,
        registers,
        communitys,
        communityComments,
        registerComments,
    };
}
exports.initModels = initModels;
exports.default = initModels;
