import { DataTypes } from 'sequelize';
import sequelize from '../Utils/dbConnection.js';

const CategoryMaster = sequelize.define('CategoryMaster', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    prefix:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default CategoryMaster;