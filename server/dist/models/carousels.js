"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carouselModel = exports.Carousels = void 0;
const sequelize_1 = require("sequelize");
class Carousels extends sequelize_1.Model {
}
exports.Carousels = Carousels;
function carouselModel(sequelize) {
    Carousels.init({
        carouselNum: {
            autoIncrement: true,
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        content: {
            type: sequelize_1.DataTypes.STRING(999),
            allowNull: false,
        },
        href: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: true,
        },
        img: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: true,
        },
        backgroundColor: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        textColor: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        onlyImg: {
            type: sequelize_1.DataTypes.TINYINT,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Carousels",
        tableName: "carousels",
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "carouselNum" }],
            },
        ],
    });
    return Carousels;
}
exports.carouselModel = carouselModel;
