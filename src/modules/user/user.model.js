const mongoose = require("mongoose");
const { UserRole } = require("../../config/constants");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:30,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:[UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER],
        default:UserRole.CUSTOMER
    },
    gender:{
        type:String,
        enum:[Gender.MALE, Gender.FEMALE, Gender.OTHER]
    },
    phone:{
        countryCode:String,
        number:String
    },
    address:{
        billing:String,
        shipping:String
    },
    image:{
        url:String,
        optimizedUrl:String
    },
    status:{
        type:String,
        enum:[UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.BLOCKED],
        default:UserStatus.INACTIVE
    },
    activationCode:String,
    forgotPasswordCode:String,
    expiryDate:Date
}, {
    timestamps:true
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;