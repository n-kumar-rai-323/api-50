const multer=require('multer');
const fs=require('fs');

const myStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        let path="./public"
        if(!fs.existsSync(path)){
            fs.mkdirSync(path, {recursive:true});
        }
        cb(null,path)
    },
    filename:(req,file,cb)=>{
        let filename =  Date.now()+"_"+file.originalname
        cb(null,filename)
    }
})

const uploader=(type='image')=>{
    let allowedExts=['jpg','jpeg','png','gif','webp'];
    let fileSizeLimit= 2 * 1024 * 1024; // 2MB
    if(type==="doc"){
        allowedExts=['pdf','doc','docx','txt'];
        fileSizeLimit=5 * 1024 * 1024; // 5MB
    }else if(type==="video"){
        allowedExts=['mp4','mkv','avi','mov'];
        fileSizeLimit=50 * 1024 * 1024; // 50MB
    }else if(type==="audio"){
        allowedExts=['mp3','wav','aac'];
        fileSizeLimit=10 * 1024 * 1024; // 10MB
    }
    
    const fileFilter=(req,file, cb)=>{
        let ext = file.originalname.split('.').pop().toLowerCase();
        if(allowedExts.includes(ext)){
            cb(null,true)
        }else{
            cb({
                code: 422,
                message: 'File type not supported',
                status:"INVALID_FILE_TYPE"
            })
        }
    }
    return multer({
        storage:myStorage,
        fileFilter:fileFilter,
        limits:{
            fileSize: fileSizeLimit
        }
    })
}


module.exports=uploader;