const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();

const prisma = new PrismaClient();

const seedExpenses = require("../seed_data/seedExpenses");

router.get("/seed", async (req, res) => {
  try {
    await prisma.expense.deleteMany();
    const expenses = await prisma.expense.createMany({
      data: seedExpenses,
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
