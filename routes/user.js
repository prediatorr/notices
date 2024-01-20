const express = require("express");

const app = express.Router();
app.get("/all",(req,res)=>{
    return res.json({
        success:true,
    })
})

app.get("/id", (req,res)=>{
    return res.json({
        success:true
    })
})

module.exports = app;
