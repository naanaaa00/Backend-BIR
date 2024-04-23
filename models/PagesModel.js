import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Books from "./BookModel.js";
import UserModel from "./UserModel.js";

const { DataTypes } = Sequelize;

const Pages = db.define(
    "pages",
    {
        pageid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        storytext: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 500],
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        relatedBookId: {
            type: DataTypes.UUID,
            references: {
                model: 'books',
                key: 'bookid',
            }
        }
    },
    {
        freezeTableName: true,
    }
);

export default Pages;