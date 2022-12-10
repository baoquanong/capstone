const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();

const prisma = new PrismaClient();

const seedUsers = require("../seed_data/seedUsers");

router.get("/seed", async (req, res) => {
  try {
    await prisma.user.deleteMany();
    const users = await prisma.user.createMany({
      data: seedUsers,
    });

    res.status(200).json(users);

  } catch (error) {
    // res.status(500).json({ error: error });
    console.log (error)
}
});

module.exports = router;
