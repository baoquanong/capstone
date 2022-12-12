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
      data: seedAccounts
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
        userId : req.user
      }
    })
    res.status(200).json(account);

  } catch (error) {
      res.status(500).json({ error: "Server Error" });
  }
})



module.exports = router;
