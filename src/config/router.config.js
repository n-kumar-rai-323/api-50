const routerConfig = require('express').Router();
const authRouter = require('../modules/auth/auth.router');

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
    let headers= req.headers;
    let body= req.body;
    res.json({
        data:{body, params, query, headers },
        message:"User fetched successfully",
        status:200,
        options:null    
    })
})

routerConfig.use('/auth',authRouter);
console.log('Router configuration loaded.');
module.exports = routerConfig;
