const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('communityFavoriteUsers', {
    favoriteUserNum: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    postId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'communityComments',
        key: 'commentNum'
      }
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userNum'
      }
    }
  }, {
    sequelize,
    tableName: 'communityFavoriteUsers',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "favoriteUserNum" },
        ]
      },
      {
        name: "communityFavoriteUsers_FK",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "communityFavoriteUsers_FK_1",
        using: "BTREE",
        fields: [
          { name: "postId" },
        ]
      },
    ]
  });
};
