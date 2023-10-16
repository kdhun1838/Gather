const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('registercomments', {
    commentNum: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    registerNum: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'registers',
        key: 'registerNum'
      }
    },
    userId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'registercomments',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "commentNum" },
        ]
      },
      {
        name: "NewTable_FK",
        using: "BTREE",
        fields: [
          { name: "registerNum" },
        ]
      },
    ]
  });
};
