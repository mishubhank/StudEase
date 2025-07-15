import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const middleware = require("../Auth/middleware");
const express = require("express");
const prisma = new PrismaClient();
const router = express.Router();

// Apply middleware
router.use(middleware);

const UserProfile = router.get("/", async (req: any, res: any) => {
  const id = parseInt(req.user.userId);
  console.log(id);
  try {
    const Profile = await prisma.student.findFirst({
      where: {
        studentId: id,
      },
    });

    return res.json({ Profile });
  } catch (e) {
    return res.json({
      message: "failed",
    });
  }
});

module.exports = UserProfile;
