"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registersModel = exports.Registers = void 0;
const sequelize_1 = require("sequelize");
class Registers extends sequelize_1.Model {
}
exports.Registers = Registers;
function registersModel(sequelize) {
    Registers.init({
        registerNum: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        category: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        personnel: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        meeting: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        position: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        contact: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        period: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        },
        content: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Registers",
        tableName: "registers",
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "registerNum" }],
            },
        ],
    });
    return Registers;
}
exports.registersModel = registersModel;
