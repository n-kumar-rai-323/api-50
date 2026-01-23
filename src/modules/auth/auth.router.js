const authRouter = require('express').Router();
const authCtrl = require('./auth.controller');
const bodyValidator = require('../../middlewares/request-validator.middleware');
const {UserRegisterDTO} = require('./auth.validator');
const uploader = require('../../middlewares/uploader.middleware');

authRouter.post('/register', uploader().single('image'), bodyValidator(UserRegisterDTO), authCtrl.register);
authRouter.get("/activate/:token", authCtrl.activateAccount);



module.exports=authRouter