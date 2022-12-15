import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = function (req, res) {
  const q = req.query.cat
    ? `SELECT p.*,u.users_id ,u.username
    ,(SELECT COUNT(*) FROM comments as c WHERE c.postid=p.posts_id) AS comments 
    ,(SELECT COUNT(*) FROM likes as l WHERE l.postid=p.posts_id)  AS likes
    FROM posts AS p
    LEFT JOIN users AS u
    ON p.uid = u.users_id
    WHERE cat = ?
    ORDER BY p.posts_id DESC;`
    : `SELECT p.*,u.users_id ,u.username 
    ,(SELECT COUNT(*) FROM comments as c WHERE c.postid=p.posts_id) AS comments 
    ,(SELECT COUNT(*) FROM likes as l WHERE l.postid=p.posts_id)  AS likes
     FROM posts AS p
     LEFT JOIN users AS u 
     ON p.uid = u.users_id 
     ORDER BY p.posts_id DESC `;

  db.query(q, [req.query.cat], (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).json(data);
    }
  });
};

export const getPost = function (req, res) {
  const q =
    "SELECT p.posts_id,  `username`, `title`,`cat`, `desc`,`view`, `date`   FROM users u JOIN posts p   ON u.users_id = p.uid WHERE p.posts_id = ? ";
  const qv = "UPDATE posts SET view = view + 1 WHERE posts_id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    db.query(qv, [req.params.id], function () {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data[0]);
    });
  });
};

export const addPost = function (req, res) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    const q =
      "INSERT INTO posts(`title`, `desc`, `cat`,`date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = function (req, res) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("wrong token!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `posts_id` = ? AND `uid` = ?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");
      return res.json("posts had been deleted");
    });
  });
};

export const updatePost = function (req, res) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json(err);
      return res.json("Post has been updated.");
    });
  });
};
