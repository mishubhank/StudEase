import { PrismaClient } from "@prisma/client";
import express from "express";
const middleware = require("../Auth/middleware");
import { emitMatchNotification } from "../socket";

const prisma = new PrismaClient();
const router = express.Router();

router.use(middleware);

const createMatchNotifications = async (
  studentUserId: number,
  tutorUserId: number,
  matchId: number,
) => {
  await prisma.notification.createMany({
    data: [
      {
        recipientId: studentUserId,
        content: "You have a new match with a tutor.",
        type: "MATCH",
        matchId,
      },
      {
        recipientId: tutorUserId,
        content: "You have a new match with a student.",
        type: "MATCH",
        matchId,
      },
    ],
  });

  emitMatchNotification(studentUserId, {
    type: "MATCH",
    matchId,
    message: "You have a new match with a tutor.",
  });

  emitMatchNotification(tutorUserId, {
    type: "MATCH",
    matchId,
    message: "You have a new match with a student.",
  });
};

const sayyes = router.post("/", async (req: any, res: any) => {
  try {
    const tutorId = req.user.userId;

    const tutor = await prisma.tutor.findUnique({
      where: {
        userId: tutorId,
      },
    });

    if (!tutor) {
      return res.status(403).json({
        message: "You are not a tutor",
      });
    }

    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({
        message: "studentId is required",
      });
    }

    const student = await prisma.student.findUnique({
      where: {
        studentId: studentId,
      },
    });

    if (!student) {
      return res.status(400).json({
        message: "Student not found. Please check the studentId.",
      });
    }

    const existingMatch = await prisma.match.findFirst({
      where: {
        studentId: student.id,
        tutorId: tutor.id,
        status: true,
      },
    });

    if (existingMatch) {
      return res.status(400).json({
        message: "You have already matched with this student",
        match: existingMatch,
      });
    }

    const pendingMatch = await prisma.match.findFirst({
      where: {
        studentId: student.id,
        tutorId: tutor.id,
        studentcon: true,
        status: false,
        tutorcon: false,
      },
    });

    if (pendingMatch) {
      const updatedMatch = await prisma.match.update({
        where: {
          id: pendingMatch.id,
        },
        data: {
          tutorcon: true,
          status: true,
        },
      });

      await createMatchNotifications(student.studentId, tutor.userId, updatedMatch.id);

      return res.json({
        message: "Match completed successfully!",
        match: updatedMatch,
      });
    }

    const newMatch = await prisma.match.create({
      data: {
        tutorId: tutor.id,
        studentId: student.id,
        status: false,
        studentcon: false,
        tutorcon: true,
      },
    });

    return res.json({
      message: "Successfully showed interest in student",
      match: newMatch,
    });
  } catch (error) {
    console.error("Unexpected error in tutor interest endpoint:", error);
    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
});

module.exports = sayyes;
