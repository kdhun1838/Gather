"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersModel = exports.Users = void 0;
const sequelize_1 = require("sequelize");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
function usersModel(sequelize) {
    Users.init({
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
        grade: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Users',
        tableName: 'users',
        timestamps: true,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'userNum' }],
            },
            {
                name: 'user_UN',
                unique: true,
                using: 'BTREE',
                fields: ['id', 'nick', 'email', 'tel'],
            },
        ],
    });
    return Users;
}
exports.usersModel = usersModel;
