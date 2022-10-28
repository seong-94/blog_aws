import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = function (req, res) {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=? ORDER BY id DESC"
    : "SELECT * FROM posts ORDER BY id DESC ";
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = function (req, res) {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = function (req, res) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO posts(`title`, `desc`,  `date`,`uid`) VALUES (?)";

    const values = [req.body.title, req.body.desc, req.body.date, userInfo.id];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = function (req, res) {};

export const updatePost = function (req, res) {};