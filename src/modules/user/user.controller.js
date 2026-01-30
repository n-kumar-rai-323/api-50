const userSvc = require("./user.servcie");

class UserController {
    async getAllUserList(req, res, next) {
        try {

            let filter = {}
            if(req.query.role){
                filter = {
                    role:req.query.role
                }
            }
            if(req.query.lado){
                filter = {
                    ...filter,
                    $or:[
                        {name:new RegExp(req.query.lado, "i")}
                    ]
                }
            }
            let {data, pagination} = await userSvc.getAllRowsByFilter(filter,req.query);
            res.json({
                data: data,
                message: "User list fetched successfully",
                status: 200,
                options: {
                    pagination: pagination
                }
            })
        } catch (exception) {
            next(exception);
        }
    }
}

const userCtrl = new UserController();
module.exports = userCtrl;