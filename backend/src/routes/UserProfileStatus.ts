import { Prisma, PrismaClient } from "@prisma/client";
import exp from "constants";
import express from "express";
const app = express();
const router = express.Router();
const auth = require("../Auth/middleware");
router.use(auth);

const prisma = new PrismaClient();
router.get("/profile-status", async (req: any, res: any) => {
  const user = req.user.userId;
  try {
    const userPro = await prisma.user.findFirst({
      where: {
        id: user,
      },
      select: {
        profile: true,
        tutor: {
          select: {
            id: true,
          },
        },
        student: {
          select: {
            id: true,
          },
        },
      },
    });
    const hasProfile = Boolean(userPro?.profile || userPro?.tutor || userPro?.student);
    return res.json({
      profilesattus: hasProfile,
    });
  } catch {
    return res.json({ msg: "failed to find status" });
  }
});
module.exports = router;
