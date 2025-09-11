const validator = require("validator");

function validateForSignup(req) {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error(`Name are Required.`);
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
    if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong enough");
  }
}

function validateForLogin(req){
  const {emailId , password} = req.body;

  if(!validator.isEmail(emailId)){
    throw new Error("Email is not valid");

  }
  if(! validator.isStrongPassword(password)){
    throw new Error("Ivalid Password")
  }
}

module.exports = {validateForSignup , validateForLogin};
