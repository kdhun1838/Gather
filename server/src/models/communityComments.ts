import { DataTypes, Model, Sequelize } from "sequelize";
import { Users } from "./users";
import { Communitys } from "./communitys";

export interface CommunityCommentsAttributes {
  commentNum: number;
  content: string;
  userId: number;
  postId: number;
  childComment: number;
}

export interface CommunityCreationAttributes
  extends Omit<CommunityCommentsAttributes, "commentNum"> {}

export class CommunityComments
  extends Model<CommunityCommentsAttributes, CommunityCreationAttributes>
  implements CommunityCommentsAttributes
{
  public commentNum!: number;
  public content!: string;
  public userId!: number;
  public postId!: number;
  public childComment!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function communityCommentsModel(
  sequelize: Sequelize
): typeof CommunityComments {
  CommunityComments.init(
    {
      commentNum: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "userNum",
        },
      },
      postId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "communitys",
          key: "communityNum",
        },
      },
      childComment: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "CommunityComments",
      tableName: "communityComments",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "commentNum" }],
        },
        {
          name: "userId",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
        {
          name: "postId",
          using: "BTREE",
          fields: [{ name: "postId" }],
        },
      ],
    }
  );

  return CommunityComments;
}
