import { DataTypes, Model, Sequelize } from "sequelize";

export interface MessagesAttributes {
  messageNum: number;
  content: string;
  userId: string;
}

export interface MessagesCreationAttributes
  extends Omit<MessagesAttributes, "messageNum"> {}

export class Messages
  extends Model<MessagesAttributes, MessagesCreationAttributes>
  implements MessagesAttributes
{
  public messageNum!: number;
  public content!: string;
  public userId!: string;

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
      userId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
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
        {
          name: "userId",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
      ],
    }
  );

  return Messages;
}
