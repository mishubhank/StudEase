import { Request ,Response } from "express";


const express=require('express')
const router=express.Router(); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth =require('../Auth/middleware')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

interface MatchReq{

  tutorId:number,
 studentId:number
}
 
router.post('/signup', async (req: any, res: any) => {
    const { name, email, password } = req.body;
    
    // Input validation
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                
            }
        });

        // Verify JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            success: true,
            token,
            email: newUser.email
        });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: "Failed to signup",
          //  error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

router.post('/signin', async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password 1" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password 2" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ 'jwt': token });
  } catch (e) {
    return res.status(500).json({ message: "Failed to signin 3" });
  }
}); 
// student details 
 router.use(auth);
router.post('/post', async(req:any,res:any )=>{
  const studentId=req.user.userId
const {   Area , message }=req.body 
  const std=req.body.std

// console.log(` actice is ${active}`);
// console.log( `user id is ${userId}`)
 console.log(`student id is ${studentId}`); 
 

console.log(req.user)
if(!Area||!std){

 return   res.json({
    'message' :'fill all fields'

   })}
//    else if(active===true){
// return res.json({
//     'message':"already posted once"
// })

//    }
//    if(active===false){

// return     res.json({

//         'message':'Already posted Once bruv'
//     })

//    } 
try{
const Already= await prisma.student.findUnique({
  where:{
    studentId:studentId

  }

})
if(Already){
    return res.json({
        "message":"Alread Posted one"
    })
}

console.log(`student id is ${studentId}`);
  const date= new Date()
 
    const student = await prisma.student.create({
       data: {
       studentId:studentId,
       std:std,
       postedON:  new Date(),
        Area:Area,
        message: message
       
      
      }
    });


//     id        Int      @id @default(autoincrement())
//   studentId Int      @unique
//   user      User     @relation(fields: [studentId], references: [id])
//   class     Int
//   Area      String
//   postedON  DateTime
//   Match     Match[]

    // jwt== eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyOTIwMDQzMywiZXhwIjoxNzI5MjA0MDMzfQ.4AaUtHOx4i00UGxfZFhJk5MBEKuLRYaZkp29tlBaCcw

    res.status(201).json(student);
    
}
catch {
    return res.status(500).json({
        'message':'failed posting an entry'
    })

}







})




module.exports= router
