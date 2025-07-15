import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../Auth/middleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Search = router.get("/ ,", async (req: any, res: any) => {
  const location = req.query.loc;
  const dis = req.query.dis;
});
module.exports = Search;
