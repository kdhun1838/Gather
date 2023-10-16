import { Sequelize } from "sequelize";
import { boardsModel } from "./boards"; // 소문자 모델명 사용
import { usersModel } from "./users"; // 소문자 모델명 사용
import { registersModel } from "./registers";
import { communitysModel } from "./communitys";
import { communityCommentsModel } from "./communityComments";

function initModels(sequelize: Sequelize) {
  const boards = boardsModel(sequelize); // 소문자 모델명 사용
  const users = usersModel(sequelize); // 소문자 모델명 사용
  const registers = registersModel(sequelize);
  const communitys = communitysModel(sequelize);
  const communityComments = communityCommentsModel(sequelize);

  return {
    boards,
    users,
    registers,
    communitys,
    communityComments,
  };
}

export default initModels;
export { initModels };
