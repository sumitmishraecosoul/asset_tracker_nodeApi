import { DataTypes } from 'sequelize';
import sequelize from '../Utils/dbConnection.js';

const ExternalAsset = sequelize.define('ExternalAsset', {
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
    warrantyStart:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    warrantyEnd:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
});

export default ExternalAsset;