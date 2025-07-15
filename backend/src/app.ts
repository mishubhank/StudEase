import express from "express";

const app = express();
app.use((req, res, next) => {
  if (req.is("multipart/form-data")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

var cors = require("cors");
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
export default app;
