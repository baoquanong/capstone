const { PrismaClient } = require("@prisma/client");
const express = require("express");
const authorization = require("../Middleware/authorization");
const router = express.Router();

const prisma = new PrismaClient();

const seedAccounts = require("../seed_data/seedAccounts");

router.get("/seed", async (req, res) => {
  try {
    await prisma.account.deleteMany();
    const accounts = await prisma.account.createMany({
      data: seedAccounts,
    });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", authorization, async (req, res) => {
  try {
    const account = await prisma.account.findMany({
      where: {
        userId: req.user,
      },
      include: {
        Expense: true,
      },
    });
    if (!account) {
      res.status(400).json({ error: "No accounts found!" });
    } else {
      res.status(200).json(account);
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/add", authorization, async (req, res) => {
  try {
    const account = await prisma.account.create({
      data: req.body,
    });
    console.log(account)


    if (!account) {
      res.status(400).json({ error: "Unable to create account" });
    } else {
      res.status(200).json(account);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
