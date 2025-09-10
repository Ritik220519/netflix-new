const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,

      validator(emailId) {
        if (!validator.isEmail(emailId)) {
          throw new Error("Email Id is not correct : " + emailId);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validator(password) {
        if (!validator.isStrongPassword(password)) {
          throw new Error("Password is incorrect.");
        }
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
