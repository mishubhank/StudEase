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

router.post("/", async (req: any, res: any) => {
  try {
    const studentId = req.user.userId;

    const student = await prisma.student.findUnique({
      where: { studentId: studentId },
    });

    if (!student) {
      res.status(403).json({ message: "You are not a student" });
      return;
    }

    const { tutorId } = req.body;
    if (!tutorId) {
      res.status(400).json({ message: "tutorId is required" });
      return;
    }

    const tutor = await prisma.tutor.findUnique({
      where: { userId: tutorId },
    });

    if (!tutor) {
      res
        .status(400)
        .json({ message: "Tutor not found. Please check the tutorId." });
      return;
    }

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

      const updatedMatch = await prisma.match.update({
        where: { id: existingMatch.id },
        data: {
          status: existingMatch.tutorcon ? true : false,
          studentcon: true,
          tutorcon: existingMatch.tutorcon,
        },
      });

      if (updatedMatch.tutorcon && updatedMatch.studentcon) {
        await createMatchNotifications(student.studentId, tutor.userId, updatedMatch.id);

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

    const newMatch = await prisma.match.create({
      data: {
        tutorId: tutor.id,
        studentId: student.id,
        status: false,
        studentcon: true,
        tutorcon: false,
      },
    });

    res.json({
      message: "Successfully showed interest in tutor",
      match: newMatch,
      status: "pending",
    });
  } catch (error) {
    console.error("Unexpected error in student interest endpoint:", error);

    if (!res.headersSent) {
      res.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  }
});

module.exports = router;
