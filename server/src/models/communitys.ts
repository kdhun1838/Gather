import { DataTypes, Model, Sequelize } from "sequelize";

export interface CommunityAttributes {
  communityNum: number;
  title: string;
  category: string;
  detail: string;
  content: string;
  view: number;
  userId: number;
}

export interface CommunityCreationAttributes
  extends Omit<CommunityAttributes, "communityNum"> {}

export class Communitys
  extends Model<CommunityAttributes, CommunityCreationAttributes>
  implements CommunityAttributes
{
  public communityNum!: number;
  public title!: string;
  public category!: string;
  public detail!: string;
  public content!: string;
  public view!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function communitysModel(sequelize: Sequelize): typeof Communitys {
  Communitys.init(
    {
      communityNum: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      detail: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      view: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "userNum",
        },
      },
    },
    {
      sequelize,
      modelName: "Communitys",
      tableName: "communitys",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "communityNum" }],
        },
        {
          name: "userId",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
      ],
    }
  );

  return Communitys;
}
