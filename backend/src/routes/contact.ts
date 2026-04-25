import { PrismaClient } from "@prisma/client";
import express from "express";

const middleware = require("../Auth/middleware");
const prisma = new PrismaClient();
const router = express.Router();

router.use(middleware); 

router.get("/student/:studentId", async (req: any, res: any) => {
  try {
    const studentUserId = Number(req.params.studentId);

    if (!studentUserId) {
      return res.status(400).json({ message: "studentId is required" });
    }

    const tutor = await prisma.tutor.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!tutor) {
      return res.status(403).json({ message: "Only tutors can view this contact" });
    }

    const student = await prisma.student.findUnique({
      where: {
        studentId: studentUserId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        subject: true,
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const match = await prisma.match.findFirst({
      where: {
        studentId: student.id,
        tutorId: tutor.id,
        status: true,
      },
    });

    if (!match) {
      return res.status(403).json({
        message: "Contact is available only after both sides match",
      });
    }

    return res.json({
      student: {
        name: student.user.name,
        email: student.user.email,
        class: student.std,
        area: student.Area,
        subjects: student.subject.map((subject) => subject.subject),
      },
      message: student.message,
      contact: student.About,
    });
  } catch (error) {
    console.error("Failed to fetch contact:", error);
    return res.status(500).json({ message: "Failed to fetch contact" });
  }
});

router.get("/tutor/:tutorId", async (req: any, res: any) => {
  try {
    const tutorUserId = Number(req.params.tutorId);

    if (!tutorUserId) {
      return res.status(400).json({ message: "tutorId is required" });
    }

    const student = await prisma.student.findUnique({
      where: {
        studentId: req.user.userId,
      },
    });

    if (!student) {
      return res.status(403).json({ message: "Only students can view this contact" });
    }

    const tutor = await prisma.tutor.findUnique({
      where: {
        userId: tutorUserId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        location: true,
        subjects: true,
      },
    });

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    const match = await prisma.match.findFirst({
      where: {
        studentId: student.id,
        tutorId: tutor.id,
        status: true,
      },
    });

    if (!match) {
      return res.status(403).json({
        message: "Contact is available only after both sides match",
      });
    }

    return res.json({
      tutor: {
        name: tutor.user.name,
        email: tutor.user.email,
        degree: tutor.degree,
        specialization: tutor.specilization,
        areas: tutor.location.map((location) => location.name),
        subjects: tutor.subjects.map((subject) => subject.subject),
      },
      contact: tutor.user.email,
    });
  } catch (error) {
    console.error("Failed to fetch contact:", error);
    return res.status(500).json({ message: "Failed to fetch contact" });
  }
});

module.exports = router;
