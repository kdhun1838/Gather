import { Sequelize, DataTypes } from "sequelize";
import { boardsModel } from "./boards";
import { usersModel } from "./users";
import { registersModel } from "./registers";
import { communitysModel } from "./communitys";
import { RegisterCommentsModel } from "./registerComments";
import { communityCommentsModel } from "./communityComments";
import { carouselModel } from "./carousels";

function initModels(sequelize: Sequelize) {
  const boards = boardsModel(sequelize);
  const users = usersModel(sequelize);
  const registers = registersModel(sequelize);
  const communitys = communitysModel(sequelize);
  const communityComments = communityCommentsModel(sequelize);
  const registerComments = RegisterCommentsModel(sequelize);
  const carousels = carouselModel(sequelize);

  registers.hasMany(registerComments, { foreignKey: "registerNum" });
  registerComments.belongsTo(registers, { foreignKey: "registerNum" });

  users.hasMany(communityComments, { foreignKey: "userId" });
  communityComments.belongsTo(users, { foreignKey: "userId" });

  return {
    boards,
    users,
    registers,
    communitys,
    communityComments,
    registerComments,
    carousels,
  };
}

export default initModels;
export { initModels };
