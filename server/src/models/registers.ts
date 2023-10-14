import { DataTypes, Model, Sequelize } from "sequelize";

export interface RegisterAttributes {
  registerNum: number;
  title: string;
  category: string;
  personnel: number;
  meeting: string;
  position: string;
  contact: string;
  period: string;
  content: string;
  view: number;
  favorite: number;
  state: number;
}

export interface RegisterCreationAttributes
  extends Omit<RegisterAttributes, "registerNum"> {}

export class Registers
  extends Model<RegisterAttributes, RegisterCreationAttributes>
  implements RegisterAttributes
{
  public registerNum!: number;
  public title!: string;
  public category!: string;
  public personnel!: number;
  public meeting!: string;
  public position!: string;
  public contact!: string;
  public period!: string;
  public content!: string;
  public view!: number;
  public favorite!: number;
  public state!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function registersModel(sequelize: Sequelize): typeof Registers {
  Registers.init(
    {
      registerNum: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      personnel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      meeting: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      period: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      view: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      favorite: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Registers",
      tableName: "registers",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "registerNum" }],
        },
      ],
    }
  );

  return Registers;
}
