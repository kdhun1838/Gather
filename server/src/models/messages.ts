import { DataTypes, Model, Sequelize } from "sequelize";

export interface MessagesAttributes {
  messageNum: number;
  content: string;
  userNum: number;
  state: number;
}

export interface MessagesCreationAttributes
  extends Omit<MessagesAttributes, "messageNum"> {}

export class Messages
  extends Model<MessagesAttributes, MessagesCreationAttributes>
  implements MessagesAttributes
{
  public messageNum!: number;
  public content!: string;
  public userNum!: number;
  public state!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function messagesModel(sequelize: Sequelize): typeof Messages {
  Messages.init(
    {
      messageNum: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userNum: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "userNum",
        },
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Messages",
      tableName: "messages",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "messageNum" }],
        },
      ],
    }
  );

  return Messages;
}
