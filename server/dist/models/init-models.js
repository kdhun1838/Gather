"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = void 0;
const boards_1 = require("./boards");
const users_1 = require("./users");
const registers_1 = require("./registers");
const communitys_1 = require("./communitys");
const registerComments_1 = require("./registerComments");
const communityComments_1 = require("./communityComments");
const communityReplys_1 = require("./communityReplys");
function initModels(sequelize) {
    const boards = (0, boards_1.boardsModel)(sequelize);
    const users = (0, users_1.usersModel)(sequelize);
    const registers = (0, registers_1.registersModel)(sequelize);
    const communitys = (0, communitys_1.communitysModel)(sequelize);
    const communityComments = (0, communityComments_1.communityCommentsModel)(sequelize);
    const communityReplys = (0, communityReplys_1.communityReplysModel)(sequelize);
    const registerComments = (0, registerComments_1.CommentsModel)(sequelize);
    registers.hasMany(registerComments, { foreignKey: "registerNum" });
    registerComments.belongsTo(registers, { foreignKey: "registerNum" });
    //------------- 커뮤니티 관계설정 --------------
    users.hasMany(communityComments, { foreignKey: "userId" });
    communityComments.belongsTo(users, { foreignKey: "userId" });
    users.hasMany(communitys, { foreignKey: "userId" });
    communitys.belongsTo(users, { foreignKey: "userId" });
    users.hasMany(communityReplys, { foreignKey: "userId" });
    communityReplys.belongsTo(users, { foreignKey: "userId" });
    communitys.hasMany(communityComments, { foreignKey: "postId" });
    communityComments.belongsTo(communitys, { foreignKey: "postId" });
    communityComments.hasMany(communityReplys, { foreignKey: "commentId" });
    communityReplys.belongsTo(communityComments, { foreignKey: "commentId" });
    return {
        boards,
        users,
        registers,
        communitys,
        communityComments,
        communityReplys,
        registerComments,
    };
}
exports.initModels = initModels;
exports.default = initModels;
