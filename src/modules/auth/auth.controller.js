const cloudinarySvc = require("../../services/cloudinary.service");
const bcrypt = require("bcryptjs");
const emailSvc = require("../../services/email.service");
const { UserStatus } = require("../../config/constants");
const { randomStringGenerator } = require("../../utilities/heplers");
const UserModel = require("../user/user.model");
class AuthController {
    register = async (req, res, next) => {
        try {
            let payload = req.body;
            payload.image = await cloudinarySvc.uploadFile(req.file.path, 'user/');

            payload.password = bcrypt.hashSync(payload.password, 12);

            payload.status = UserStatus.INACTIVE;
            payload.activationCode =randomStringGenerator(100)

            // Save user to database
            const userobj = new UserModel(payload);
            await userobj.save();
           await emailSvc.sendEmail({
                to: payload.email,
                subject: "Welcome to Our Platform",
                message: `<h1>Welcome, ${payload.name} your bank account has been hacked!</h1><p>Thank you for registering.</p>`
            });

            res.json({
                data: userobj,
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