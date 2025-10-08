import { DataTypes } from 'sequelize';
import sequelize from '../Utils/dbConnection.js';

const ComputerAsset = sequelize.define('ComputerAsset', {
    brand:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    model:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    serialNumber:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    processor:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    ram:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    warrantyStart:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    warrantyEnd:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
});

export default ComputerAsset;