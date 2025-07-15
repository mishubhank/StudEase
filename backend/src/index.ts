import app from "./app";
var cors = require("cors");
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
app.use(cors());
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

const io = new Server(5000, {
  cors: {
    origin: "https://localhost:3000", // Allow connections only from this origin
  },
});

io.on("connection", (socket: any) => {
  console.log("server running  ");

  socket.emit("welcome", { message: "Hi, welcome to the WebSocket server!" });
  return { message: "hi" };
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
