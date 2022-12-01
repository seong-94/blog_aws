import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
// import { v4 as uuidv4 } from "uuid";
// import mime from "mime-types";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import history from "connect-history-api-fallback";
//routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.SERVER_PORT || "5000";
const app = express();

// const storage = multer.diskStorage({
//   destinatio: (req, file, cb) => {
//     cb(null, "image");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${uuidv4()}.${mime.extension(file.mimetype)}`);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype))
//       cb(null, true);
//     else cb(new Error("해당 파일의 형식을 지원하지 않습니다."), false);
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use(express.json());
app.use(cookieParser());
app.use(history());
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// app.get("/", (req, res) => {
//   res.set({
//     "Cache-Control": "no-cache, no-store, must-revalidate",
//     Pragma: "no-cache",
//     Date: Date.now(),
//   });
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// http.createServer(app).listen(port, () => {
//   console.log(`app listening at ${port}`);
// });

app.listen(port, () => {
  console.log(`접속완료! http://localhost:${port}`);
});
