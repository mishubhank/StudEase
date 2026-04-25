import { PrismaClient } from "@prisma/client";
import express from "express";

const middleware = require("../Auth/middleware");
const prisma = new PrismaClient();
const router = express.Router();

router.use(middleware);

router.get("/", async (req: any, res: any) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        recipientId: req.user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 25,
    });

    return res.json({ notifications });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
});

router.patch("/read", async (req: any, res: any) => {
  try {
    await prisma.notification.updateMany({
      where: {
        recipientId: req.user.userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return res.json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Failed to mark notifications as read:", error);
    return res.status(500).json({
      message: "Failed to mark notifications as read",
    });
  }
});

module.exports = router;
