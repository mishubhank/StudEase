import express from "express";
import cors from "cors";
import { expressCorsOptions } from "./config";

const app = express();
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use((req, res, next) => {
  if (req.is("multipart/form-data")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(cors(expressCorsOptions));
export default app;
