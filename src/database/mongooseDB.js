const mongoose = require("mongoose");


async function connectionDB(){
   await mongoose.connect("mongodb+srv://rtksri123:Ritik22@cluster-all.vqekfl0.mongodb.net/Netflix")
}

module.exports = connectionDB;