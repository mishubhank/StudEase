import { Server, Socket } from "socket.io";

const user = new Map<string, string[]>();

export default function socketConnection(socket: Socket) {
  console.log("new client ", socket.id);
  socket.emit("welcome", { message: "Hi from server" });
  socket.on("join", (userId: string) => {
    if (!user.has(userId)) {
      user.set(userId, []);
    }
    const sockets = user.get(userId)!;
    if (!sockets.includes(socket.id)) {
      sockets.push(socket.id);
    }

    socket.on("disconnect", () => {
      const all = user.get(userId);
      if (all) {
        const remainingSockets = all.filter((id) => id !== socket.id);
        if (remainingSockets.length > 0) {
          user.set(userId, remainingSockets);
        } else {
          user.delete(userId);
        }
      }
    });
  });
}

export function sendNotification(
  toUserId: string,
  io: Server,
  message: string,
  payload: Record<string, unknown> = {}
) {
  const allSocket = user.get(toUserId) || [];
  allSocket.forEach((socketId) => {
    io.to(socketId).emit("notification", {
      message,
      ...payload,
    });
  });
}
