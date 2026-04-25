import app from "./app";
import http from "http";
import socketConnection from "../websocket";
import { assertRequiredEnv, port, socketCorsOptions } from "./config";
const tutor = require("./routes/tutor");
const student = require("./routes/stud");
const interested = require("./routes/tutorinterest");
const studentIn = require("./routes/studentin");
const allTutors = require("./routes/allTutor");
const allstudent = require("./routes/allStudents");
const profile = require("./routes/profile");
const search = require("./routes/search");
const userProfile = require("./routes/userProfile");
const getAllTutions = require("./routes/getTutions");
const getStudMatches = require("./routes/getStudMatches");
const profilestatus = require("./routes/UserProfileStatus");
const notifications = require("./routes/notifications");
const contact = require("./routes/contact");
const { Server } = require("socket.io");

assertRequiredEnv();

app.use("/api/search", search);
app.use("/api/auth/tutor", tutor);
app.use("/api/auth/student", student);
app.use("/api/tutor/interested", interested);
app.use("/api/student/interested", studentIn);
app.use("/api/student/get-matches", getStudMatches);
app.use("/api/tutor/listall", allTutors);
app.use("/api/student/listall", allstudent);
app.use("/api/userProfile", userProfile);
app.use("/api/profile", profile);
app.use("/api/listallStuds", getAllTutions);
app.use("/api/user", profilestatus);
app.use("/api/notifications", notifications);
app.use("/api/contact", contact);

//app.use('api/profile/:id',userProfile)
const server = http.createServer(app);
const io = new Server(server, {
  cors: socketCorsOptions,
});

app.set("io", io);
io.on("connection", (socket: any) => {
  console.log("server running  ");
  socketConnection(socket);
  socket.emit("welcome", { message: "Hi, welcome to the WebSocket server!" });
});
server.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
