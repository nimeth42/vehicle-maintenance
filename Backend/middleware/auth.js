const authenticationMiddleware=(req,res,next)=>{
    //1.token decode
    //2. req.userId=1
    //3.next
    req.userId=100;
    next();
}
module.exports=authenticationMiddleware;