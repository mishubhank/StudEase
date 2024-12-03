import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from 'express';
const middleware = require('../Auth/middleware');

const prisma = new PrismaClient();
const router = express.Router();

// Apply middleware
router.use(middleware);

const sayyes = router.post('/', async (req: any, res: any) => {
 try {
   // Get student ID from authenticated user
   const studentId = req.user.userId;
   console.log("Student User ID:", studentId);

   // Finding valid student
   const student = await prisma.student.findUnique({
     where: {
       studentId: studentId
     }
   });

   if (!student) {
     return res.status(403).json({
       message: "You are not a student"
     });
   }

   // Get and validate tutor ID from request body
   const { tutorId } = req.body;
   
   if (!tutorId) {
     return res.status(400).json({
       message: "tutorId is required"
     });
   }

   // Find tutor
   const tutor = await prisma.tutor.findUnique({
     where: { 
       userId: tutorId 
     }
   });
     console.log(tutor);
   if (!tutor) {  

     return res.status(400).json({
       message: "Tutor not found. Please check the tutorId."
     });
   }

   try {
     // Check for ANY existing match between student and tutor
     const existingMatch = await prisma.match.findFirst({
       where: {
         studentId: student.id,
         tutorId: tutor.id,
       }
     });

     if (existingMatch) {
       // If match exists and already completed
       if (existingMatch.status === true) {
         return res.status(400).json({
           message: "You have already matched with this tutor",
           match: existingMatch
         });
       }

       // If match exists but not completed, update it
       const updatedMatch = await prisma.match.update({
         where: {
           id: existingMatch.id
         },
         data: {
           // Set status to true if tutor has already said yes
           status: existingMatch.tutorcon ? true : false,
           studentcon: true,
           // Keep existing tutorcon value
           tutorcon: existingMatch.tutorcon
         }

       });

       // Check if both have now said yes
       if (updatedMatch.tutorcon && updatedMatch.studentcon) {
         return res.json({
           message: "It's a match! Both parties have confirmed.",
           match: updatedMatch,
           status: "matched"
         });
       }

       return res.json({
         message: "Successfully showed interest. Waiting for tutor to confirm.",
         match: updatedMatch,
         status: "Match sent waiting for response"
       });

     } 
     else {
       // If no match exists at all, create new one
       const newMatch = await prisma.match.create({
         data: {
           tutorId: tutor.id,
           studentId: student.id,
           status: false,
           studentcon: true,
           tutorcon: false
         }
       });

       console.log('New match created:', newMatch);
       return res.json({
         message: "Successfully showed interest in tutor",
         match: newMatch,
         status: "pending"
       });
     }
   } catch (error) {
    

     console.error("Error handling match:", error);
     return res.status(500).json({
       message: "Failed to process match. Please try again later.",
       //error: process.env.NODE_ENV === 'development' ? error.message : undefined
     });
   }

 } catch (error) {
   // Handle any unexpected errors
   console.error("Unexpected error in student interest endpoint:", error);
   return res.status(500).json({
     message: "An unexpected error occurred. Please try again later."
   });
 }
});

module.exports = sayyes;