import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
// const middleware = require('../Auth/middleware');

const prisma = new PrismaClient();
const router = express.Router();

const giveallStudent = router.get("/", async (req: any, res: any) => {
  const allStudents = await prisma.student.findMany({});

  return res.json(allStudents);
});
module.exports = giveallStudent;
