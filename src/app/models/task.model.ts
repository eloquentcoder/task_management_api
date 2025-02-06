import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";


class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public userId!: number;
    public isDone!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(128),
            allowNull: true,
        },
        userId: {
            type: new DataTypes.INTEGER(),
            allowNull: false,
        },
        isDone: {
            type: new DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue: false,
        }
    },
    {
        tableName: "tasks",
        sequelize
    }
)

export default Task;