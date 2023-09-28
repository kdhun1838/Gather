import { DataTypes, Model, Sequelize } from "sequelize";

export interface CommunityAttributes {
  communityNum: number;
  title: string;
  category: string;
  detail: string;
  content: string;
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

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function communitysModel(sequelize: Sequelize): typeof Communitys {
  Communitys.init(
    {
      communityNum: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
        type: DataTypes.STRING(255),
        allowNull: false,
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
      ],
    }
  );

  return Communitys;
}
