const jwt = require('jsonwebtoken');
const { AppConfig } = require('../config/config');
const authSvc = require('../modules/auth/auth.service');
const { UserRole } = require('../config/constants');



const auth = (role=null) => {
    return async (req, res, next) => {
        try {
            let token = req.headers['authorization'];

            if (!token) {
                throw {
                    code: 401,
                    message: "Authorization token missing",
                    status: "UNAUTHORIZED"
                };
            }
            // Assuming the token is in the format
            token = token.split(' ').pop();
            const data = jwt.verify(token, AppConfig.jwtSecret);
            // Attach user info to request object
            if(data.type !== "Bearer"){
                throw {
                    code: 403,
                    message: "Invalid token type",
                    status: "UNAUTHORIZED"
                };
            }

            const userDetails =  await authSvc.getSingleRowByfilter({
                _id: data.userId
            })
            if (!userDetails) {
                throw {
                    code: 401,
                    message: "User not found",
                    status: "UNAUTHORIZED"
                };
            }
          
            req.loggedInUser = authSvc.getUserPublicProfile(userDetails);

            // Role-based access control
            if(userDetails.role === UserRole.ADMIN || role === null || role.includes(userDetails.role)){
                next(); // ✅ proceed to the next middleware or route handler
            }else{
                throw{
                    code: 403,
                    message: "Forbidden: You don't have permission to access this resource",
                    status: "FORBIDDEN"
                }
            }

        } catch (exception) {
            let code = exception.code || 401;
            let message = exception.message || "Invalid or expired token";
            let status = exception.status || "UNAUTHORIZED";
            next({
                code: code,
                message: message,
                status: status
            }); // ✅ pass error
        }
    };
};

module.exports = auth;
