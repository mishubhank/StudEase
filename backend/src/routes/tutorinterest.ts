import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from 'express';
const middleware = require('../Auth/middleware');
const { Server } = require("socket.io");
const prisma = new PrismaClient();
const router = express.Router();


// Apply middleware
const io = new Server(5001, {
  cors: {
    origin: "https://localhost:3000", // Allow connections only from this origin
  },
});


 io.on('connection',(socket:any)=>{

 console.log("server running  ")

  socket.emit("welcome", { message: "Hi, welcome to the WebSocket server!" });
 return {"message":'hi'}


 })

router.use(middleware);

// Define types
interface AuthRequest extends Request {
  user: {
    userId: number;
  }
}

const sayyes = router.post('/', async (req: any, res: any) => {
  try {
    // Get tutor ID from authenticated user
    const tutorId = req.user.userId;
    console.log("Tutor User ID:", tutorId);

    // Finding valid tutor
    const tutor = await prisma.tutor.findUnique({
      where: {
        userId: tutorId
      }
    });

    if (!tutor) {
      return res.status(403).json({
        message: "You are not a tutor"
      });
    }

    // Get and validate student ID from request body
    const { studentId } = req.body;
    
    if (!studentId) {
      return res.status(400).json({
        message: "studentId is required"
      });
    }

    // Find student
    const student = await prisma.student.findUnique({
      where: { 
        studentId: studentId 
      }
    });

    if (!student) {
      return res.status(400).json({
        message: "Student not found. Please check the studentId."
      });
    }

    // Check if they have matched before
    try {
      const existingMatch = await prisma.match.findFirst({
        where: {
          studentId: student.id,
          tutorId: tutor.id,
          status: true
        }
      });

      if (existingMatch) {
        return res.status(400).json({
          message: "You have already matched with this student",
          match: existingMatch
        });
      }
    } catch (error) {
      console.error("Error checking existing match:", error);
      return res.status(500).json({
        message: "Failed to check existing matches. Please try again later."
      });
    }

    // Check if student has said yes before
    try {
      const pendingMatch = await prisma.match.findFirst({
        where: {
          studentId: student.id,
          tutorId: tutor.id,
          studentcon: true,
          status: false,
          tutorcon: false
        }
      });

      // If there's a pending match from student, complete it
      if (pendingMatch) {
        const updatedMatch = await prisma.match.update({
          where: {
            id: pendingMatch.id
          },
          data: {
            tutorcon: true,
            status: true
          }
        });

        console.log('Match updated:', updatedMatch);
        return res.json({
          message: "Match completed successfully!",
          match: updatedMatch
        });
      }
    } catch (error) {
      console.error("Error processing pending match:", error);
      return res.status(500).json({
        message: "Failed to process pending match. Please try again later."
      });
    }

    // If no existing or pending matches, create new match
    try {
      const newMatch = await prisma.match.create({
        data: {
          tutorId: tutor.id,
          studentId: student.id,
          status: false,
          studentcon: false,
          tutorcon: true
        }
      });

      console.log('New match created:', newMatch);
      return res.json({
        message: "Successfully showed interest in student",
        match: newMatch
      });
    } catch (error:any) {
      
      console.error("Error creating new match:", error);
      return res.status(500).json({
        message: "Failed to create new match. Please try again later."
      });
    }

  } catch (error) {
    // Handle any unexpected errors
    console.error("Unexpected error in tutor interest endpoint:", error);
    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later."
    });
  }
});

module.exports = sayyes;