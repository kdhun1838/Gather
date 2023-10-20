"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communitysModel = exports.Communitys = void 0;
const sequelize_1 = require("sequelize");
class Communitys extends sequelize_1.Model {
}
exports.Communitys = Communitys;
function communitysModel(sequelize) {
    Communitys.init({
        communityNum: {
            autoIncrement: true,
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        category: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        detail: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        view: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        userId: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "users",
                key: "userNum",
            },
        },
    }, {
        sequelize,
        modelName: "Communitys",
        tableName: "communitys",
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "communityNum" }],
            },
            {
                name: "userId",
                using: "BTREE",
                fields: [{ name: "userId" }],
            },
        ],
    });
    return Communitys;
}
exports.communitysModel = communitysModel;
