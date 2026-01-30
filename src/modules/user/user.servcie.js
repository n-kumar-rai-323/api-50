const BaseService = require("../../services/base.service");
const UserModel = require("./user.model");

class UserService extends BaseService{


}

const userSvc = new UserService(UserModel);
module.exports = userSvc;