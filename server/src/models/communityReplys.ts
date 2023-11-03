import { DataTypes, Model, Sequelize } from "sequelize";

export interface CommunityReplyAttributes {
  replyNum: number;
  userId: number;
  postId: number;
  commentId: number;
  content: string;
  isParentsReply: boolean;
}

export interface CommunityReplyCreationAttributes
  extends Omit<CommunityReplyAttributes, "replyNum"> {}

export class CommunityReplys
  extends Model<CommunityReplyAttributes, CommunityReplyCreationAttributes>
  implements CommunityReplyAttributes
{
  public replyNum!: number;
  public userId!: number;
  public postId!: number;
  public commentId!: number;
  public content!: string;
  public isParentsReply!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function communityReplysModel(
  sequelize: Sequelize
): typeof CommunityReplys {
  CommunityReplys.init(
    {
      replyNum: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
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
      commentId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "communityComments",
          key: "commentNum",
        },
      },
      content: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      isParentsReply: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "CommunityReplys",
      tableName: "communityReplys",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "replyNum" }],
        },
        {
          name: "communityReply_FK",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
        {
          name: "communityReply_FK_1",
          using: "BTREE",
          fields: [{ name: "postId" }],
        },
        {
          name: "communityReply_FK_2",
          using: "BTREE",
          fields: [{ name: "commentId" }],
        },
      ],
    }
  );

  return CommunityReplys;
}
