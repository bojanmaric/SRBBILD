const jwt=require('jsonwebtoken');

const authenticate=(req,res,next)=>{
    try{
        console.log('authentifikacija')
        const token=req.headers.authorization.split(' ')[1]
        const decode= jwt.verify(token,'AzQ,PI)0(')

        req.user=decode
        next()
    }
    catch(error){
        res.json({
            message:'Authentication failed'
        })
    }
}
module.exports=authenticate