const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const userAuth = async (req, res, next) => {
  try {
    const {token} = req.cookies;

    console.log(token);

    if (!token) {
      res.status(400).send("invalid token");
    }
    const decoded = await jwt.verify(token, "Netflix-SecretKey");
    const {user_id}  = decoded;
    console.log("id : " , user_id);

    const user = await User.findById(user_id);
    if (!user) {
      throw new Error("User not Present");
    } 
      req.user = user;
      next();
    

    
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports =  userAuth;
