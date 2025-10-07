import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send(`<h1 style="color: black; text-align: center; margin-top: 100px;">Welcome to the Asset Management API</h1>`);
});


app.listen(process.env.PORT, () => {
  console.log(`server listening on http://localhost:${process.env.PORT}`);
});

