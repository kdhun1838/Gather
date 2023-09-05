import { DataTypes, Model, Sequelize } from "sequelize";

export interface BoardsAttributes {
  boardNum: number;
  user_name: string;
  title: string;
  category: string;
  proceed: string;
  limit: number;
  startdate: Date;
  skill: string;
  deadline: Date;
  position: string;
  content: string;
}

export interface BoardsCreationAttributes
  extends Omit<BoardsAttributes, "boardNum"> {}

export class Boards
  extends Model<BoardsAttributes, BoardsCreationAttributes>
  implements BoardsAttributes
{
  public boardNum!: number;
  public user_name!: string;
  public title!: string;
  public category!: string;
  public proceed!: string;
  public limit!: number;
  public startdate!: Date;
  public skill!: string;
  public deadline!: Date;
  public position!: string;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function boardsModel(sequelize: Sequelize): typeof Boards {
  Boards.init(
    {
      boardNum: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      proceed: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      skill: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Boards",
      tableName: "boards",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "boardNum" }],
        },
      ],
    }
  );

  return Boards;
}
