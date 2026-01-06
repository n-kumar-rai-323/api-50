const authRouter = require('express').Router();
const authCtrl = require('./auth.controller');

authRouter.post('/register', authCtrl.register);

console.log('Auth router loaded.');
    
module.exports=authRouter;