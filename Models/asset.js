import { DataTypes } from 'sequelize';
import sequelize from '../Utils/dbConnection.js';

const Asset = sequelize.define('Asset', {
    assetTagId:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    checkOut:{
        type: DataTypes.BOOLEAN,
    },
    status:{
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['Available', 'Assigned','Under Maintenance','Broken']
    }
});

export default Asset;