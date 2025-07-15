const middleware = require("../Auth/middleware");
const express = require("express");
import { JwtDecodeOptions } from "jwt-decode";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
router.use(middleware);

const prisma = new PrismaClient();
router.get("/", async (req: any, res: any) => {
  const head = req.headers.authorization;

  const studentId = req.user.userId;
  console.log(studentId);

  if (!studentId) {
    console.log("student id not found");
    return res.status(404).json({
      message: "student Id not present",
    });
  }

  const isValid = await prisma.student.findFirst({
    where: {
      studentId: studentId,
    },
  });
  if (!isValid) {
    return res.status(400).json({
      message: "no such student",
    });
  }

  const studentMatches = await prisma.match.findMany({
    where: {
      studentId: studentId,
    },
    include: {
      tutor: true,
    },
  });
  console.log(studentMatches);

  return res.status(200).json({
    message: "all okay",
  });
});

module.exports = router;
