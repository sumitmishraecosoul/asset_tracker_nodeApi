import { DataTypes } from 'sequelize';
import sequelize from '../Utils/dbConnection.js';

const LocationMaster = sequelize.define('LocationMaster', {
    location:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    site:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default LocationMaster;