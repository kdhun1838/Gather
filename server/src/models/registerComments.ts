import { DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, Model, Sequelize } from "sequelize";
import { Registers } from "./registers";

interface CommentAttributes {
  commentNum: number;
  registerNum: number;
  userId: string;
  comment: string;
}

export class RegisterComments extends Model<CommentAttributes> {
  public commentNum!: number;
  public registerNum!: number;
  public userId!: string;
  public comment!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRegisters!: HasManyGetAssociationsMixin<Registers>; // Note the null assertions!
  public addRegisters!: HasManyAddAssociationMixin<Registers, number>;
  public hasRegisters!: HasManyHasAssociationMixin<Registers, number>;
  public countRegisters!: HasManyCountAssociationsMixin;
  public createRegisters!: HasManyCreateAssociationMixin<Registers>;
}

export function CommentsModel(sequelize: Sequelize): typeof RegisterComments {
  RegisterComments.init(
    {
      commentNum: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      registerNum: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comments",
      tableName: "comments",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "commentNum" }],
        },
      ],
    }
  );

  return RegisterComments;
}

Registers.hasMany(RegisterComments, { foreignKey: "registerNum" });
RegisterComments.belongsTo(Registers, { foreignKey: "registerNum" });
