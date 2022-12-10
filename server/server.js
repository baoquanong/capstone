// DEPENDANCIES
require("dotenv").config();
const express = require('express')
const { PrismaClient } = require("@prisma/client");

const app = express()
const prisma = new PrismaClient();
const port = process.env.PORT ?? 3000;

const UserController = require("./Controllers/UserController");
const seedUsers = require("./seed_data/seedUsers");

// MIDDLEWARE
app.use(express.json());
app.use("/api/users", UserController);




//ROUTES
app.get('/', (req, res) => {
  res.send('Hello World!')
})



//CONNECT 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
