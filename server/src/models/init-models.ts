import { Sequelize, DataTypes } from "sequelize";
import { boardsModel } from "./boards";
import { usersModel } from "./users";
import { registersModel } from "./registers";
import { communitysModel } from "./communitys";
import { communityCommentsModel } from "./communityComments";
import { CommentsModel } from "./registerComments";

function initModels(sequelize: Sequelize) {
  const boards = boardsModel(sequelize);
  const users = usersModel(sequelize);
  const registers = registersModel(sequelize);
  const communitys = communitysModel(sequelize);
  const communityComments = communityCommentsModel(sequelize);
  const registerComments = CommentsModel(sequelize);

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
  };
}

export default initModels;
export { initModels };
