import { profile } from "console";
import { subscribe } from "diagnostics_channel";
import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../Auth/middleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

interface MatchReq {
  tutorId: number;
  studentId: number;
}

router.post("/signup", async (req: any, res: any) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Verify JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      token,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to signup",
      //  error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.post("/signin", async (req: any, res: any) => {
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
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({ jwt: token });
  } catch (e) {
    return res.status(500).json({ message: "Failed to signin 3" });
  }
});
// student details

router.use(auth);

router.post("/post", async (req: any, res: any) => {
  const studentId = req.user.userId;
  const { Area, message, contact, subjects, std } = req.body;
  console.log(subjects.length, "subject lengt");
  // console.log(` actice is ${active}`);
  // console.log( `user id is ${userId}`)
  console.log(`student id issssss ${studentId}`);

  console.log(req.user);
  if (!Area || !std) {
    return res.json({
      message: "fill all fields",
    });
  }

  const Already = await prisma.student.findUnique({
    where: {
      studentId: studentId,
    },
  });
  if (Already) {
    return res.json({
      message: "Alread Posted one",
    });
  }
  const date = new Date();
  console.log(`student id is ${studentId}`, date);
  {
    console.log(subjects.length, "subject length");
    const student = await prisma.student.create({
      data: {
        studentId: studentId,
        std: std,
        postedON: new Date(),
        Area: Area || {},
        About: contact,
        message: message,
        subject: {
          create: subjects.map((subject: any) => ({
            subject: subject.name,
          })),
        },
      },
    });

    return res.status(201).json(student);
  }

  {
    return res.status(500).json({
      message: "failed posting an entry",
    });
  }
});
//   finding tutor  location and subject
router.post("/findstuds", async (req: any, res: any) => {
  const tutorID = req.body.tutorId;
  console.log(tutorID, "tutorr ID");
  const whereClause: any = {
    OR: [],
  };
  //const studentId = req.user.userId;
  // const student = await prisma.student.findMany({
  //   where: {
  //     studentId: studentId,
  //   },
  // });
  // if (!student) {
  //   return res.json({
  //     message: "You are not a student",
  //   });
  // }

  const { Area, subjects } = req.body;
  if (subjects && subjects.length > 0) {
    whereClause.OR.push({
      subject: {
        some: {
          subject: {
            in: subjects.name,
            mode: "insensitive",
          },
        },
      },
    });
  }
  if (Area && Area.length > 0) {
    whereClause.OR.push({
      location: {
        some: {
          name: {
            in: Area.name,
            mode: "insensitive",
          },
        },
      },
    });
  }

  const query = whereClause.OR.length === 0 ? {} : whereClause;

  const students = await prisma.student.findMany({
    where: query,
    include: {
      user: true,
      location: true,
      subject: true,
    },
    orderBy: {
      postedON: "desc", // Show newest posts first
    },
  });
  return res.json(students);
});

router.get("/profile-status", async (req: any, res: any) => {
  const userId = req.user.userId;
  {
    const profilestatus = await prisma.student.findFirst({
      where: {
        studentId: userId,
      },
      include: {
        user: {
          select: {
            profile: true,
          },
        },
      },
    });
    return res.json({
      profilestatsus: profilestatus.user.profile,
    });
  }
  {
    return res.json({
      msg: "failed to fethch",
    });
  }
});

module.exports = router;
