const express = require("express");
const app = express();


app.use("/" , (req , res) =>{
    res.send("home page")
})

app.listen(3000 , ()=>{
    console.log("app is listining on port 3000")
})