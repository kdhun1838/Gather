"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communitysModel = exports.Communitys = void 0;
const sequelize_1 = require("sequelize");
class Communitys extends sequelize_1.Model {}
exports.Communitys = Communitys;
function communitysModel(sequelize) {
  Communitys.init(
    {
      communityNum: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
      },
      view: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      Favorite: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
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
      ],
    }
  );
  return Communitys;
}
exports.communitysModel = communitysModel;
