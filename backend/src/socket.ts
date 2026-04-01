import { Server } from "socket.io";

let io: Server | null = null;

export const initSocketServer = (port: number) => {
  if (io) {
    return io;
  }

  io = new Server(port, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("register", (payload: { userId?: number }) => {
      if (!payload?.userId) {
        return;
      }

      socket.join(`user:${payload.userId}`);
    });

    socket.emit("welcome", { message: "Connected to match notification server." });
  });

  return io;
};

export const emitMatchNotification = (userId: number, payload: Record<string, unknown>) => {
  if (!io) {
    return;
  }

  io.to(`user:${userId}`).emit("match:created", payload);
};
