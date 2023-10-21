import { Sequelize } from "sequelize";
import { boardsModel } from "./boards";
import { usersModel } from "./users";
import { registersModel } from "./registers";
import { communitysModel } from "./communitys";
import { CommentsModel } from "./registerComments";
import { communityCommentsModel } from "./communityComments";
import { communityReplysModel } from "./communityReplys";

function initModels(sequelize: Sequelize) {
  const boards = boardsModel(sequelize);
  const users = usersModel(sequelize);
  const registers = registersModel(sequelize);
  const communitys = communitysModel(sequelize);
  const communityComments = communityCommentsModel(sequelize);
  const communityReplys = communityReplysModel(sequelize);
  const registerComments = CommentsModel(sequelize);

  registers.hasMany(registerComments, { foreignKey: "registerNum" });
  registerComments.belongsTo(registers, { foreignKey: "registerNum" });

  //------------- 커뮤니티 관계설정 --------------
  users.hasMany(communityComments, { foreignKey: "userId" });
  communityComments.belongsTo(users, { foreignKey: "userId" });

  users.hasMany(communitys, { foreignKey: "userId" });
  communitys.belongsTo(users, { foreignKey: "userId" });

  users.hasMany(communityReplys, { foreignKey: "userId" });
  communityReplys.belongsTo(users, { foreignKey: "userId" });

  communitys.hasMany(communityComments, { foreignKey: "postId" });
  communityComments.belongsTo(communitys, { foreignKey: "postId" });

  communityComments.hasMany(communityReplys, { foreignKey: "commentId" });
  communityReplys.belongsTo(communityComments, { foreignKey: "commentId" });

  return {
    boards,
    users,
    registers,
    communitys,
    communityComments,
    communityReplys,
    registerComments,
  };
}

export default initModels;
export { initModels };
