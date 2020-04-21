function logRequestBody(req,res,next){
    debugger;

    console.log("request body",req.body);
    if(!req.body)
    { return next("request doesnot have body ")
            
    }
    next()
  }
module.exports=logRequestBody