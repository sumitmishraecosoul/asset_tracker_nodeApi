import { DataTypes } from 'sequelize';
import sequelize from '../Utils/dbConnection.js';

const SubcategoryMaster = sequelize.define('SubcategoryMaster', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    code:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default SubcategoryMaster;