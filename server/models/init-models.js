var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _user = require("./user");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    board,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
