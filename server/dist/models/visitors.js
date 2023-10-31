"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorModel = exports.Visitors = void 0;
const sequelize_1 = require("sequelize");
class Visitors extends sequelize_1.Model {
}
exports.Visitors = Visitors;
function visitorModel(sequelize) {
    Visitors.init({
        visitorNum: {
            autoIncrement: true,
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        visitor_count: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        user_count: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        total_count: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Visitors",
        tableName: "visitors",
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "visitorNum" }],
            },
        ],
    });
    return Visitors;
}
exports.visitorModel = visitorModel;
