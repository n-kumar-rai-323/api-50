const mongoose= require('mongoose');
const { dbConfig } = require('./config');

const dbInit=async()=>{
    try{
        await mongoose.connect(dbConfig.mongodb.url,{
            dbName:dbConfig.mongodb.name,
            autoCreate:true,
            autoIndex:true
        })
        console.log("Database connected successfully");
    }catch(exception){
        console.log("Database connection failed", exception);
        throw{
            code:500,
            message:"Database connection failed",
            status:"error"
        }
    }
}
dbInit();