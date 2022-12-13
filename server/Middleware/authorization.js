require("dotenv").config();
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
    try {

        const token = req.header("token");

        if (!token) {
            return res.status(403).json("Not Authorized1"); 
        }

        const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = verify.user;
        next();

    } catch (error) {
        console.log (error)
        return res.status(403).json("Not Authorized2");   
    }

}

module.exports = authorization;

