"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communityReplysModel = exports.CommunityReplys = void 0;
const sequelize_1 = require("sequelize");
class CommunityReplys extends sequelize_1.Model {
}
exports.CommunityReplys = CommunityReplys;
function communityReplysModel(sequelize) {
    CommunityReplys.init({
        replyNum: {
            autoIncrement: true,
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "users",
                key: "userNum",
            },
        },
        postId: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "communitys",
                key: "communityNum",
            },
        },
        commentId: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "communityComments",
                key: "commentNum",
            },
        },
        content: {
            type: sequelize_1.DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "CommunityReplys",
        tableName: "communityReplys",
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "replyNum" }],
            },
            {
                name: "communityReply_FK",
                using: "BTREE",
                fields: [{ name: "userId" }],
            },
            {
                name: "communityReply_FK_1",
                using: "BTREE",
                fields: [{ name: "postId" }],
            },
            {
                name: "communityReply_FK_2",
                using: "BTREE",
                fields: [{ name: "commentId" }],
            },
        ],
    });
    return CommunityReplys;
}
exports.communityReplysModel = communityReplysModel;
