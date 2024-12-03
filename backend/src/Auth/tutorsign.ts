// const jwt2= require('jsonwebtoken');

// const authReq=(req:any,res:any ,next:any)=>{
 
//    const authHeader= req.headers('Authorization');
//    console.log(authHeader);
//    const token=authHeader.split('')[1]
//    if(!token){

//       return res.status(401).json({
//          'message':'token missing'
//       })

//    }
//    try{
//    const decode=jwt2.verify(token,process.env.JWT_SECRET);
//    req.tutor=decode;
// next();

//    }
//    catch(e){
//     res.status(401).json({
//      'message':"auth failed"

//     })

//    }


// }
// module.exports=authReq