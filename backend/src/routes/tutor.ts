// import { create } from "domain";

import { subscribe } from "diagnostics_channel";

// import { Request,Response } from "express";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../Auth/middleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const image = require("./upload");

///import { User } from "../express";

interface MatchReq {
  studentId: number;
  tutorId: number;
}
interface User {
  userId: number;
}
interface Location {
  name: string;
  tutorId: number;
}
interface Subject {
  name: string;
  userId: number;
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
      { userId: newUser.id, email: newUser.email, role: "tutor" },
      process.env.JWT_SECRET
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
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {});
    return res.status(200).json({ jwt: token });
  } catch (e) {
    return res.status(500).json({ message: "Failed to signin 3" });
  }
});

//  post tute
router.use(auth);

router.post("/post", image.single("tutorimage"), async (req: any, res: any) => {
  const imageUrl = req.file.path;
  // const imageUrl
  //  console.log(imageUrl)
  if (!imageUrl) {
    return res.json({
      message: " no file found",
    });
  }
  // return res.json(imageUrl)
  const userId = req.user.userId;
  // console.log(userId);
  const { edu, active, offering, degree, specilization, location, subjects } =
    JSON.parse(req.body.jsonData);
  //console.log(` actice is ${active}`);
  // const location:Location[]= JSON.parse(req.body.jsonData)
  console.log(`user id is ${userId}`);
  if (!Array.isArray(location)) {
    return res.status(400).json({
      message: "Location must be an array",
    });
  }

  //console.log(req.user, edu);
  if (!location || !specilization || !degree) {
    return res.json({
      message: "fill all fields",
    });
  }

  console.log("subjectbbbbbbb", subjects);
  {
    const tutor = await prisma.tutor.create({
      data: {
        userId: userId || {}, // Ensure userId is a valid value, not an empty object
        edu: edu || {}, // Ensure edu is a valid value, not an empty object
        active: true,
        degree: degree || {}, // Ensure degree is a valid value, not an empty object
        specilization: specilization || {}, // Ensure specilization is a valid value, not an empty object
        photo: imageUrl,
        subjects: {
          // Use `create` instead of `createMany` for nested relations
          create: [],
        },
        location: {
          // Use `create` instead of `createMany` for nested relations
          create: location.map((loc) => ({
            name: loc.name,
          })),
        },
      },
    });

    // jwt== eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyOTIwMDQzMywiZXhwIjoxNzI5MjA0MDMzfQ.4AaUtHOx4i00UGxfZFhJk5MBEKuLRYaZkp29tlBaCcw

    return res.status(201).json(tutor);
  }
  {
    console.log;
    return res.status(500).json({
      message: "failed posting an entry",
    });
  }
});

//----------------TUtorprofile----------------//

router.get("/tutprofile", async (req: any, res: any) => {
  const userId = req.user.userId;
  //console.log(userId.userId)
  try {
    const tutorProfile = await prisma.tutor.findMany({
      where: { userId: userId },
      include: {
        user: {
          select: { name: true }, // Fetch only the tutor's name
        },
        location: true, // Fetch all locations related to the tutor
      },
    });
    return res.json(tutorProfile);
  } catch (e) {
    return res.json({ message: "error fethcing profile" });
  }
});

router.post("/tutprofile/review/", (req: any, res: any) => {
  const studentId = req.user.userId;
  if (!studentId) {
  }
});

router.post("/findtutor", async (req: any, res: any) => {
  const { locations, offering } = req.body;
  console.log(offering, "offering", locations, "locations");

  const whereClause: any = {
    OR: [],
  };
  if (locations && Array.isArray(locations) && locations.length > 0) {
    whereClause.OR.push({
      location: {
        some: {
          name: {
            in: locations.map((loc) => loc.value),
            mode: "insensitive",
          },
        },
      },
    });
  }
  if (offering && Array.isArray(offering) && offering.length > 0) {
    whereClause.OR.push({
      subjects: {
        some: {
          subject: {
            in: offering.map((subj) => subj.value),
            mode: "insensitive",
          },
        },
      },
    });
  }
  const query = whereClause.OR.length === 0 ? {} : whereClause;
  const filterTuts = await prisma.tutor.findMany({
    where: query,
    include: {
      location: true,
      subjects: true,
    },
    take: 8,
  });
  //  console.log(filterTuts);
  res.json(filterTuts);
});

router.get("/profile-stat", async (req: any, res: any) => {
  const userId = req.user.userId;
  try {
    const status = await prisma.tutor.findMany({
      where: { userId: userId },
      include: {
        user: {
          select: { profile: true },
        },
      },
    });
  } catch {}
});

module.exports = router;
