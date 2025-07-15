import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const middleware = require("../Auth/middleware");
const express = require("express");
const prisma = new PrismaClient();
const router = express.Router();

router.use(middleware);
const getAllTutions = router.get("/all", async (req: any, res: any) => {
  const tutorid = req.user.userId;
  console.log(tutorid);
  if (!tutorid) {
    res.json({ "message:": "you are not logged in" });
  }

  const limit = 5;
  var page = Number(req.query.page) || 1;

  if (page <= 0) {
    page = 1;
  }
  const skip = (page - 1) * limit;

  const tutor = await prisma.tutor.findFirst({
    where: {
      userId: tutorid,
    },
  });

  const resp = await prisma.student.findMany({
    skip: skip,
    take: limit,
    select: {
      Area: true,
      std: true,
      postedON: true,
      studentId: true,
      location: true,
      matches: {
        where: {
          tutorId: tutor?.id,
        },
        select: {
          tutorcon: true,
          studentcon: true,
          status: true,
        },
      },
    },
  });

  //   resp.forEach((item:any)=>{
  //   //if(item.matches[0])    console.log(item.matches[0])
  //    if(item.matches.length===0){ console.log('apply')
  //     return
  //     }
  //      else if(item.matches[0]&&  item.matches[0].studentcon===true) console.log('respond?')
  //     else if ( item.matches[0]&& item.matches[0].tutorcon===true)console.log('sent')
  //       else  if(item.matches.length>0) console.log('yaya matched')

  //   }
  // )

  return res.json(resp);
});
module.exports = getAllTutions;
