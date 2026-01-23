const BaseService = require("../../services/base.service");
const UserModel = require("../user/user.model");
const cloudinarySvc = require("../../services/cloudinary.service")
const bcrypt = require("bcryptjs");
const { UserStatus} = require("../../config/constants");
const { randomStringGenerator } = require("../../utilities/heplers");
const { AppConfig } = require("../../config/config");
const emailSvc = require("../../services/email.service");
class AuthService extends BaseService {
    transformUserData = async (req) => {
        try{
            let payload = req.body;
            payload.image = await cloudinarySvc.uploadFile(req.file.path, 'user/');
            payload.password = bcrypt.hashSync(payload.password, 12);
            payload.status = UserStatus.INACTIVE;
            payload.activationCode = randomStringGenerator(100)
            return payload;
        } catch (exception) {
            throw exception;
        }
    }
    activationNotify=async(user)=>{
        try{
            const response= await emailSvc.sendEmail({
                to: user.email,
                subject: "Activate your account",
                message: `
                    <div style="font-family:Arial,sans-serif;max-width:400px;margin:auto;padding:16px;border:1px solid #eee;border-radius:8px;text-align:center;">
                        <h2 style="color:#333;">Welcome, ${user.name}!</h2>
                        <p style="margin:16px 0;">Activate your account:</p>
                        <a href="${AppConfig.frontendURL}/activate/${user.activationCode}" style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;">Activate Account</a>
                        <p style="margin:16px 0;font-size:12px;color:#666;">${AppConfig.frontendURL}/activate/${user.activationCode}</p>
                    </div>
                `
            });
        }catch(exception){
            throw exception;
        }
    }
    notifyActivationSuccess=async(user)=>{
        try{
            const response= await emailSvc.sendEmail({
                to: user.email,
                subject: "Account Activated Successfully",
                message: `
                    <div style="font-family:Arial,sans-serif;max-width:400px;margin:auto;padding:16px;border:1px solid #eee;border-radius:8px;text-align:center;">
                        <h2 style="color:#333;">Hello, ${user.name}!</h2>
                        <p style="margin:16px 0;">Your account has been successfully activated.</p>
                    </div>
                `
            });
        }catch(exception){
            throw exception;
        }
    }
}

const authSvc = new AuthService(UserModel);
module.exports = authSvc;