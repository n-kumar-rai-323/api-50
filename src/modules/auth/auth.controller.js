const cloudinarySvc = require("../../services/cloudinary.service");

class AuthController {
    register = async (req, res, next) => {
        try {
            let data = req.body;
            let image = await cloudinarySvc.uploadFile(req.file.path, 'user/');

            res.json({
                data: { data, image },
                message: "User registered successfully",
                status: 201,
                options: null
            });
        } catch (exception) {
            next(exception);
        }
    }
}

const authCtrl = new AuthController();
module.exports = authCtrl;