"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCommentsModel = exports.RegisterComments = void 0;
const sequelize_1 = require("sequelize");
class RegisterComments extends sequelize_1.Model {
}
exports.RegisterComments = RegisterComments;
function RegisterCommentsModel(sequelize) {
    RegisterComments.init({
        commentNum: {
            autoIncrement: true,
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        registerNum: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
        },
        comment: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "RegisterComments",
        tableName: "registercomments",
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
exports.RegisterCommentsModel = RegisterCommentsModel;
