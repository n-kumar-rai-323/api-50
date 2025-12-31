const routerConfig = require('express').Router();

routerConfig.get('/health', (req,res,next)=>{
    res.json({
        data:null,
        message:"API is working fine",
        status:200,
        options:null
    })
})

routerConfig.get("/:username",(req,res,next)=>{
    let params= req.params;
    let query= req.query;
    res.json({
        data:{ params, query },
        message:"User fetched successfully",
        status:200,
        options:null    
    })
})

module.exports = routerConfig;
