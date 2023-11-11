"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesModel = exports.Messages = void 0;
const sequelize_1 = require("sequelize");
class Messages extends sequelize_1.Model {
}
exports.Messages = Messages;
function messagesModel(sequelize) {
    Messages.init({
        messageNum: {
            autoIncrement: true,
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        content: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        userNum: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "users",
                key: "userNum",
            },
        },
        state: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        sequelize,
        modelName: "Messages",
        tableName: "messages",
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "messageNum" }],
            },
        ],
    });
    return Messages;
}
exports.messagesModel = messagesModel;
