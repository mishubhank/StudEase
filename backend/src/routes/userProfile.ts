import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const middleware = require("../Auth/middleware");
const express = require("express");
const prisma = new PrismaClient();
const router = express.Router();

const Profile = router.get("/:id", async (req: any, res: any) => {
  const param = req.params;

  console.log(param.id);
  try {
    const profile = await prisma.tutor.findFirst({
      where: {
        userId: parseInt(param.id),
      },
    });
    if (profile) {
      return res.json(profile);
    }
  } catch (e) {
    return res.json("Errrror fethching user profile");
  }

  try {
    const profil = await prisma.student.findFirst({
      where: {
        studentId: parseInt(param.id),
      },
    });
    if (profil) {
      res.json(profil);
    }
  } catch (e) {
    return res.json("Errrror fethching user profile");
  }

  return res.status(505).json({
    message: "no such profile",
  });
});

module.exports = Profile;
