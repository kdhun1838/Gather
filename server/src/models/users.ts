import { DataTypes, Model, Sequelize } from 'sequelize';

export interface UsersAttributes {
  userNum: number;
  id: string;
  password: string;
  name: string;
  nick: string;
  email: string;
  tel: string;
  age: number;
  grade: string;
}

export interface UsersCreationAttributes
  extends Omit<UsersAttributes, 'userNum'> {}

export class Users
  extends Model<UsersAttributes, UsersCreationAttributes>
  implements UsersAttributes
{
  public userNum!: number;
  public id!: string;
  public password!: string;
  public name!: string;
  public nick!: string;
  public email!: string;
  public tel!: string;
  public age!: number;
  public grade!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function usersModel(sequelize: Sequelize): typeof Users {
  Users.init(
    {
      userNum: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nick: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      tel: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'users',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'userNum' }],
        },
        {
          name: 'user_UN',
          unique: true,
          using: 'BTREE',
          fields: ['id', 'nick', 'email', 'tel'],
        },
      ],
    }
  );

  return Users;
}
