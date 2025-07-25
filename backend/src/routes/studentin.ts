import { PrismaClient } from "@prisma/client";
import express from "express";
const middleware = require("../Auth/middleware");

const prisma = new PrismaClient();
const router = express.Router();

// Apply middleware
router.use(middleware);

router.post("/", async (req: any, res: any) => {
  try {
    //Get student ID from authenticated user
    const studentId = req.user.userId;
    console.log("Student User ID:", studentId);

    // Finding valid student
    const student = await prisma.student.findUnique({
      where: { studentId: studentId },
    });

    if (!student) {
      res.status(403).json({ message: "You are not a student" });
      return;
    }

    // Get and validate tutor ID from request body
    const { tutorId } = req.body;
    if (!tutorId) {
      res.status(400).json({ message: "tutorId is required" });
      return;
    }

    // Find tutor
    const tutor = await prisma.tutor.findUnique({
      where: { userId: tutorId },
    });

    console.log(tutor, "tutor details");
    if (!tutor) {
      res
        .status(400)
        .json({ message: "Tutor not found. Please check the tutorId." });
      return;
    }

    // Check for existing match
    const existingMatch = await prisma.match.findFirst({
      where: {
        studentId: student.id,
        tutorId: tutor.id,
      },
    });

    if (existingMatch) {
      if (existingMatch.status === true) {
        res.status(400).json({
          message: "You have already matched with this tutor",
          match: existingMatch,
        });
        return;
      }

      // Update existing match
      const updatedMatch = await prisma.match.update({
        where: { id: existingMatch.id },
        data: {
          status: existingMatch.tutorcon ? true : false,
          studentcon: true,
          tutorcon: existingMatch.tutorcon,
        },
      });

      if (updatedMatch.tutorcon && updatedMatch.studentcon) {
        res.json({
          message: "It's a match! Both parties have confirmed.",
          match: updatedMatch,
          status: "matched",
        });
      } else {
        res.json({
          message:
            "Successfully showed interest. Waiting for tutor to confirm.",
          match: updatedMatch,
          status: "Match sent waiting for response",
        });
      }
      return;
    }

    // Create new match
    const newMatch = await prisma.match.create({
      data: {
        tutorId: tutor.id,
        studentId: student.id,
        status: false,
        studentcon: true,
        tutorcon: false,
      },
    });

    console.log("New match created:", newMatch);
    res.json({
      message: "Successfully showed interest in tutor",
      match: newMatch,
      status: "pending",
    });
  } catch (error) {
    console.error("Unexpected error in student interest endpoint:", error);

    // Check if response was already sent
    if (!res.headersSent) {
      res.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  }
});

module.exports = router;
