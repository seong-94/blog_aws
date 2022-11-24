import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import multer from "multer";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

const port = 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`접속완료! http://localhost:${port}`);
});
