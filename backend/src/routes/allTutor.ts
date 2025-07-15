import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
// const middleware = require('../Auth/middleware');

import { createClient } from "redis";

// const client = createClient({
//   username: "default",
//   password: process.env.REDIS_PASSWORD,
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: 15946,
//   },
// });
// console.log("Redis Client", process.env.REDIS_HOST, process.env.REDIS_PASSWORD);

// client.on("error", (err) => console.log("Redis Client Error", err));
// (async () => {
//   await client.connect();
//   console.log("Connected to Redis");

//   // await client.set("foo", "bar");
//   // const result = await client.get("foo");
//   // console.log(result); // >>> bar
// })();

const prisma = new PrismaClient();
const router = express.Router();

const givealltutor = router.get("/", async (req: any, res: any) => {
  const limit = Number(req.query.limit) || 6;
  var page = Number(req.query.page) || 1;
  const key = `all-${limit}-${page}`;

  if (page <= 0) {
    page = 1;
  }
  const cachedData = null;
  if (cachedData) {
    return res.json({ cachedData });
  }
  const skip = (page - 1) * limit;
  const allTutor = await prisma.tutor.findMany({
    skip: skip,
    take: limit,
    include: {
      location: true,
    },
  });
  // await client.set(key, JSON.stringify(allTutor), { EX: 60 * 5 });
  return res.json({
    allTutor,
  });
});
module.exports = givealltutor;
