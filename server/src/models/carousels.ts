import { DataTypes, Model, Sequelize } from "sequelize";

export interface CarouselsAttributes {
  carouselNum: number;
  content: string;
  href: string;
  img: any;
}

export interface CarouselsCreationAttributes
  extends Omit<CarouselsAttributes, "carouselNum"> {}

export class Carousels
  extends Model<CarouselsAttributes, CarouselsCreationAttributes>
  implements CarouselsAttributes
{
  public carouselNum!: number;
  public content!: string;
  public href!: string;
  public img!: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function carouselModel(sequelize: Sequelize): typeof Carousels {
  Carousels.init(
    {
      carouselNum: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING(999),
        allowNull: false,
      },
      href: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      img: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Carousels",
      tableName: "carousels",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "carouselNum" }],
        },
      ],
    }
  );

  return Carousels;
}
