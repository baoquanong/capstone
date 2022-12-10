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
    
    const encryptedUsers = seedUsers.map ((user) => {
        return {
        ...user,
        password: bcrypt.hashSync(user.password, saltRounds)
        }
    })
    const users = await prisma.user.createMany({
      data: encryptedUsers,
    });

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ error: error });
    
}
});

// router.post ("/login", async (req, res) => {
//     try {
//         const user = await user.username.findUnique(
//             {
//                 where : {
//                     username: req.body.username,
//                 }
//             }
//         )
        
        
//     } catch (error) {
//         res.status(500).json({ error: error });
//     }
// })

module.exports = router;
