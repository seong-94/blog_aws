import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
//routes
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import replyRoutes from "./routes/replys.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const app = express();
const __dirname = path.dirname(__filename);
const port = process.env.SERVER_PORT || "5000";

const storage = multer.diskStorage({
  destinatio: (req, file, cb) => {
    cb(null, "image");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype))
      cb(null, true);
    else cb(new Error("해당 파일의 형식을 지원하지 않습니다."), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: Date.now(),
  });
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/likes", likeRoutes);
app.use("/reply", replyRoutes);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

http.createServer(app).listen(port, () => {
  console.log(`app listening at ${port}`);
});

// app.listen(port, () => {
//   console.log(`접속완료! http://localhost:${port}`);
// });
