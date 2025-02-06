import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";


class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        }
    },
    {
        tableName: "users",
        sequelize,
    }
)

export default User;