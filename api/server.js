import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const port = 5000;

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/posts", postRoutes);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`접속완료! http://localhost:${port}`);
});
