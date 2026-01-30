const { UserRole } = require('../../config/constants');
const auth = require('../../middlewares/auth.middleware');
const userCtrl = require('./user.controller');

const userRouter = require('express').Router();

// user listing
userRouter.get('/',auth([UserRole.SELLER]), userCtrl.getAllUserList);


module.exports = userRouter;