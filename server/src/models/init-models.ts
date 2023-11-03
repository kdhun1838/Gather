import { Sequelize } from "sequelize";
import { usersModel } from "./users";
import { registersModel } from "./registers";
import { communitysModel } from "./communitys";
import { RegisterCommentsModel } from "./registerComments";
import { communityCommentsModel } from "./communityComments";
import { carouselModel } from "./carousels";
import { communityReplysModel } from "./communityReplys";
import { visitorModel } from "./visitors";

function initModels(sequelize: Sequelize) {
  const users = usersModel(sequelize);
  const registers = registersModel(sequelize);
  const communitys = communitysModel(sequelize);
  const communityComments = communityCommentsModel(sequelize);
  const registerComments = RegisterCommentsModel(sequelize);
  const carousels = carouselModel(sequelize);
  const communityReplys = communityReplysModel(sequelize);
  const visitors = visitorModel(sequelize);

  registers.hasMany(registerComments, { foreignKey: "registerNum" });
  registerComments.belongsTo(registers, { foreignKey: "registerNum" });
  users.hasMany(registerComments, { foreignKey: "userId" });
  registerComments.belongsTo(users, { foreignKey: "userId" });
  users.hasMany(registers, { foreignKey: "userNum" });
  registers.belongsTo(users, { foreignKey: "userNum" });

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
    users,
    registers,
    communitys,
    communityComments,
    communityReplys,
    registerComments,
    carousels,
    visitors,
  };
}

export default initModels;
export { initModels };
