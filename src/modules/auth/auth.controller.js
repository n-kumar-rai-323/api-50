const cloudinarySvc = require("../../services/cloudinary.service");
const bcrypt = require("bcryptjs");
class AuthController {
    register = async (req, res, next) => {
        try {
            let data = req.body;
            data.image = await cloudinarySvc.uploadFile(req.file.path, 'user/');

            data.password = bcrypt.hashSync(data.password, 12);

            // Simulate user creation (replace with actual DB logic)
            data.id = Date.now(); // Mock user ID

            res.json({
                data: { data },
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