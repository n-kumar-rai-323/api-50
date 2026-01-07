const authRouter = require('express').Router();
const authCtrl = require('./auth.controller');
const bodyValidator = require('../../middlewares/request-validator.middleware');
const {UserRegisterDTO} = require('./auth.validator');
authRouter.post('/register',bodyValidator(UserRegisterDTO), authCtrl.register);


module.exports=authRouter;