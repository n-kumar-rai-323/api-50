const cloudinarySvc = require("../../services/cloudinary.service");
const bcrypt = require("bcryptjs");
const emailSvc = require("../../services/email.service");
class AuthController {
    register = async (req, res, next) => {
        try {
            let payload = req.body;
            payload.image = await cloudinarySvc.uploadFile(req.file.path, 'user/');

            payload.password = bcrypt.hashSync(payload.password, 12);

           await emailSvc.sendEmail({
                to: payload.email,
                subject: "Welcome to Our Platform",
                message: `<h1>Welcome, ${payload.name} your bank account has been hacked!</h1><p>Thank you for registering.</p>`
            });

            res.json({
                data: { payload },
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