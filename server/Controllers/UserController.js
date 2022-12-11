const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const saltRounds = 10;

const prisma = new PrismaClient();

const seedUsers = require("../seed_data/seedUsers");

router.get("/seed", async (req, res) => {
  try {
    await prisma.user.deleteMany();

    const encryptedUsers = seedUsers.map((user) => {
      return {
        ...user,
        password: bcrypt.hashSync(user.password, saltRounds),
      };
    });
    const users = await prisma.user.createMany({
      data: encryptedUsers,
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ error: "User not found!" });
    } else {
      const loginPass = bcrypt.compareSync(req.body.password, user.password);
      if (loginPass) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ error: "Incorrect password!" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "server post error" });
  }
});

module.exports = router;
