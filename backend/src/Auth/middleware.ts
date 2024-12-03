const jwt2= require('jsonwebtoken');

const authReq=(req:any,res:any ,next:any)=>{
 
   const authHeader= req.headers['authorization'];
   
   //console.log(req.headers);
   
   const token=authHeader.split(' ')[1]
   //console.log(token)
   if(!token){

      return res.status(401).json({
         'message':'token missingggg'
      })
  
   }  
   try{ 
   const decode=jwt2.verify(token,process.env.JWT_SECRET);
   
     req.user=decode;
     
   next();

   } 
   catch(e){
    res.status(401).json({
     'message':"auth failed"

    })

   }


}
module.exports=authReq