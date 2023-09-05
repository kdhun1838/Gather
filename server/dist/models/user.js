"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
function UserModel(sequelize) {
    User.init({
        userNum: {
            autoIncrement: true,
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        id: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        nick: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        tel: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        age: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        job: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        career: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        skill: {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "User",
        tableName: "user",
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "userNum" }],
            },
            {
                name: "user_UN",
                unique: true,
                using: "BTREE",
                fields: ["id", "nick", "email", "tel"],
            },
        ],
    });
    return User;
}
exports.UserModel = UserModel;
