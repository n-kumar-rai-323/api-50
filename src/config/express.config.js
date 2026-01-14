const express = require('express');
const routerConfig = require('./router.config');
const app = express();
const fs = require('fs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})

app.use("/api", routerConfig);

//404 Error Handler 
app.use((req,res,next)=>{
  next({
    code:404,
    message:"Route Not Found",    
    status:"NOT_FOUND",
  })
    // res.status(404).json({
    //     error:null,
    //     message:"Route Not Found",    
    //     status:404,
    //     options:null
    // })
})
app.use((error,req,res,next)=>{
let code = error.code || 500;
let errorDetail = error.details || null;
let msg = error.message || "Something went wrong";
let status = error.status || "INTERNAL_SERVER_ERROR";

if(req.file && fs.existsSync(req.file.path)){
  fs.unlinkSync(req.file.path);
}
res.status(code).json({
    error:errorDetail,
    message:msg,
    status:status,
    options:null
})
})
module.exports = app;