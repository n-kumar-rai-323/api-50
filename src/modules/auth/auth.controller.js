class AuthController{
    register(req,res,next){
        let data = req.body;
        res.json({
            data:data,
            message:"User registered successfully",
            status:201,
            options:null
        })
    }
}

const authCtrl = new AuthController();
module.exports = authCtrl;