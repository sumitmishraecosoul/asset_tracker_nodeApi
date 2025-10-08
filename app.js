import express from 'express';
import dotenv from 'dotenv';
import sequelize from './Utils/dbConnection.js';
import { setupSwagger } from './swagger.js';
import All_User_Routes from './Utils/All_User_Routes.js';
import All_Models_Relationship from './Utils/All_Models_Relationship.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send(`<h1 style="color: black; text-align: center; margin-top: 100px;">Welcome to the Asset Management API</h1>`);
});

All_Models_Relationship();

setupSwagger(app);

All_User_Routes(app);

sequelize.sync().then(() => {
  console.log('Database synced successfully.');
}).catch((error) => {
  console.error('Unable to sync the database:', error);
});


app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});


