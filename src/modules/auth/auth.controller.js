const { AppConfig } = require("../../config/config");
const { UserStatus } = require("../../config/constants");
const emailSvc = require("../../services/email.service");
const authSvc = require("./auth.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class AuthController {
    register = async (req, res, next) => {
        try {
            const payload = await authSvc.transformUserData(req);
            // let payload = req.body;
            // payload.image = await cloudinarySvc.uploadFile(req.file.path, 'user/');
            // payload.password = bcrypt.hashSync(payload.password, 12);
            // payload.status = UserStatus.INACTIVE;
            // payload.activationCode = randomStringGenerator(100)
            // Save user to database
            // const userobj = new UserModel(payload);
            // await userobj.save();'
            const userobj = await authSvc.dataStore(payload);

            await emailSvc.sendEmail({
                to: payload.email,
                subject: "Welcome to Our Platform",
                message: `<h1>Welcome, ${payload.name} your bank account has been hacked!</h1><p>Thank you for registering.</p>`
            });
            await authSvc.activationNotify(userobj);
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
    activateAccount = async (req, res, next) => {
        try {
            const token = req.params.token;
            let userInfo = await authSvc.getSingleRowByfilter({ activationCode: token });
            if (!userInfo) {
                throw {
                    code: 400,
                    message: "Invalid activation token",
                    status: "BAD_REQUEST"
                }
            }

            userInfo = await authSvc.updateOneByFilter({
                _id: userInfo._id
            }, {
                activationCode: null,
                status: UserStatus.ACTIVE
            });
            // or
            // userInfo.activationCode = null;
            // userInfo.status = "ACTIVE";
            // // or
            // await authSvc.dataStore({ ...userInfo, status: UserStatus.ACTIVE });
            // res.json({
            //     data: userInfo,
            //     message: "Account activated successfully",
            //     status: 200,
            //     options: null
            // });

            await authSvc.notifyActivationSuccess(userInfo);
            res.json({
                data: null,
                message: "Account activated successfully",
                status: 200,
                options: null
            });
        } catch (exception) {
            next(exception);
        }
    }

    login = async (req, res, next) => {
        try {
            // Login logic to be implemented 
            const {email, password}=req.body;
            
            const userDetails=await authSvc.getSingleRowByfilter({
                email:email
            })
          
            if(!userDetails){
                throw {
                    code: 401,
                    message: "User not registered",
                    status: "UNAUTHORIZED"
                }
            }
            // 1. Verify user credentials
            const isPasswordValid = bcrypt.compareSync(password, userDetails.password);
            if (!isPasswordValid) {
                throw {
                    code: 401,
                    message: "Invalid credentials",
                    status: "UNAUTHORIZED"
                }
            }
            // Check if account is activated

            if(userDetails.status!==UserStatus.ACTIVE || userDetails.activationCode !==null){
                throw {
                    code: 403,
                    message: "Account not activated",
                    status: "FORBIDDEN"
                }
            }
            // 2. Generate JWT token
            let accessToken = jwt.sign({
                userId: userDetails._id,
                type: "Bearer"
            }, AppConfig.jwtSecret, { expiresIn: '1h' });
            // Refresh token generation (optional)
            let refreshToken = jwt.sign({
                userId: userDetails._id,
                type: "Refresh"
            }, AppConfig.jwtSecret, { expiresIn: '7d' });
            // 3. Return token in response
            res.json({
                data: {
                   accessToken,
                   refreshToken
                },
                message: "Login successful",
                status: 200,
                options: null
            });
        } catch (exception) {
            next(exception);
        }

    }
}

const authCtrl = new AuthController();
module.exports = authCtrl;