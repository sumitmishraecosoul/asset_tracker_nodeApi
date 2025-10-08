import { DataTypes } from 'sequelize';
import sequelize from '../Utils/dbConnection.js';

const Employee = sequelize.define('Employee', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    department:{
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Engineering', 'Customer Service', 'Legal', 'Operations', 'Product', 'Support', 'Other'],
    }
});

export default Employee;