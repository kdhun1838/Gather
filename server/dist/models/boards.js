"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsModel = exports.Board = void 0;
const sequelize_1 = require("sequelize");
class Board extends sequelize_1.Model {
}
exports.Board = Board;
function boardsModel(sequelize) {
    Board.init({
        boardNum: {
            autoIncrement: true,
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        user_name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        category: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        proceed: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        limit: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        startdate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        skill: {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: false,
        },
        deadline: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        position: {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: false,
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Board",
        tableName: "board",
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "boardNum" }],
            },
        ],
    });
    return Board;
}
exports.boardsModel = boardsModel;
