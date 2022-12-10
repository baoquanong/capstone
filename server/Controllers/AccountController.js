const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();

const prisma = new PrismaClient();

const seedAccounts = require("../seed_data/seedAccounts");

router.get("/seed", async (req, res) => {
  try {
    await prisma.account.deleteMany();
    const accounts = await prisma.account.createMany({
      data: seedAccounts
    });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
