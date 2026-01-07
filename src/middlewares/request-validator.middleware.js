const { optional } = require("joi");

const bodyValidator = (schema)=>{
    return  async(req,res,next)=>{
        try{
            const data = req.body;
            let response = await schema.validateAsync(data,{ abortEarly:false});
            console.log({response})
            next();
        }catch(exception){
            console.log({exception:exception.details})
            let messageBag = {}
            if(exception.details){
                exception.details.map((val)=>{
                    let key=val.context.label;
                    let msg = val.message;
                    messageBag[key]=msg;
                })
            }
            next({
                details:messageBag,
                code:400,
                message:"Validation Failed",
                status:"VALIDATION_ERROR",
            })
            // res.status(422).json({
            //     error:messageBag,
            //     message:"Validation Failed",
            //     status:"VALIDATION_ERROR",
            //     optional:null
            // })
        }

    }
}

module.exports=bodyValidator;