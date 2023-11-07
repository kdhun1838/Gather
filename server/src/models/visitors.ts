import { DataTypes, Model, Sequelize } from "sequelize";

export interface VisitorsAttributes {
  visitorNum: number;
  visitor_count: number;
  user_count: number;
  total_count: number;
  date: string;
}

export interface VisitorsCreationAttributes
  extends Omit<VisitorsAttributes, "visitorNum"> {}

export class Visitors
  extends Model<VisitorsAttributes, VisitorsCreationAttributes>
  implements VisitorsAttributes
{
  visitorNum!: number;
  visitor_count!: number;
  user_count!: number;
  total_count!: number;
  date!: string;
}

export function visitorModel(sequelize: Sequelize): typeof Visitors {
  Visitors.init(
    {
      visitorNum: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      visitor_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      user_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Visitors",
      tableName: "visitors",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "visitorNum" }],
        },
      ],
    }
  );

  return Visitors;
}
