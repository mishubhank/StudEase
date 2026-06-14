import app from "./app";
var cors = require("cors");
import http from "http";
import socketConnection from "../websocket";
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
const port = 3000;
const { Server } = require("socket.io");
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
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

//app.use('api/profile/:id',userProfile)

import { CorsOptions } from "cors";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow connections only from this origin
  },
});

app.set("io", io);
io.on("connection", (socket: any) => {
  console.log("server running  ");
  socketConnection(socket);
  socket.emit("welcome", { message: "Hi, welcome to the WebSocket server!" });
});
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

module.exports = app;
