import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from 'express';
// const middleware = require('../Auth/middleware');

const prisma = new PrismaClient();
const router = express.Router();


 const givealltutor= router.get('/', async(req:any,res:any)=>{
    const limit=Number(req.query.limit)||2;
     var page=Number(req.query.page)||1;


   if(page<=0) {page=1}
   const skip= (page-1)*limit
  const allTutor= await prisma.tutor.findMany({
    skip : skip,
    take:limit
   

   
  })
  
  return res.json({

    allTutor
  })

})
module.exports= givealltutor