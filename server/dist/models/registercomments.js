"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModel = exports.RegisterComments = void 0;
const sequelize_1 = require("sequelize");
class RegisterComments extends sequelize_1.Model {
}
exports.RegisterComments = RegisterComments;
function CommentsModel(sequelize) {
    RegisterComments.init({
        commentNum: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
        },
        registerNum: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Comments",
        tableName: "comments",
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "commentNum" }],
            },
        ],
    });
    return RegisterComments;
}
exports.CommentsModel = CommentsModel;
