class AuthController{
    register(req,res,next){
        res.json({
            data:null,
            message:"User registered successfully",
            status:201,
            options:null
        })
    }
}

const authCtrl = new AuthController();
module.exports = authCtrl;