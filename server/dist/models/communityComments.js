"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communityCommentsModel = exports.CommunityComments = void 0;
const sequelize_1 = require("sequelize");
class CommunityComments extends sequelize_1.Model {
}
exports.CommunityComments = CommunityComments;
function communityCommentsModel(sequelize) {
    CommunityComments.init({
        commentNum: {
            autoIncrement: true,
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
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
        childComment: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "CommunityComments",
        tableName: "communityComments",
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "commentNum" }],
            },
            {
                name: "userId",
                using: "BTREE",
                fields: [{ name: "userId" }],
            },
            {
                name: "postId",
                using: "BTREE",
                fields: [{ name: "postId" }],
            },
        ],
    });
    return CommunityComments;
}
exports.communityCommentsModel = communityCommentsModel;
