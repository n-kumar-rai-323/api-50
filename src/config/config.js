require('dotenv').config();
const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
};


const smtpConfig={
    provider:process.env.SMTP_PROVIDER,
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    user:process.env.SMTP_USERNAME,
    password:process.env.SMTP_PASSWORD,
    from:process.env.SMTP_FROM

}

const dbConfig={
    mongodb:{
        url:process.env.MONGODB_URL,
        // localURL:process.env.MONGODB_LOCAL_URL,
        name:process.env.MONGODB_DB_NAME
        }
}
module.exports = { cloudinaryConfig, smtpConfig, dbConfig };