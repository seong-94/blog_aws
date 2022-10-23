import express from "express";
const port = 4000;

const app = express();

app.listen(port, () => {
  console.log(`접속완료! http://localhost:${port}`);
});
