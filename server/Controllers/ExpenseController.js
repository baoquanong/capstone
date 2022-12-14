const { PrismaClient } = require("@prisma/client");
const express = require("express");
const authorization = require("../Middleware/authorization");
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

router.post("/add", authorization, async (req, res) => {
  try {
    const expense = await prisma.expense.create({
      data: req.body,
      include: {
        account: { include: { Expense: true } },
      },
    });

    if (!expense) {
      res.status(400).json({ error: "Unable to create expense" });
    } else {
      res.status(200).json(expense);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/delete/:id", authorization, async (req, res) => {
  try {
    const deleteExpense = await prisma.expense.delete({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteExpense) {
      res.status(400).json({ error: "Unable to find expenseId" });
    } else {
      res.status(200).json(deleteExpense);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
