import { db } from "../db.js";
import jwt from "jsonwebtoken";
// import moment from "moment";

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.users_id AS userId, username  FROM comments AS c JOIN users AS u ON (u.users_id = c.userId)
    WHERE c.postId = ? ORDER BY c.date DESC
    `;
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json("로그인후 이용 가능합니다.");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO comments(`desc`, `date`, `userId`, `postId`) VALUES (?)";
    const values = [req.body.desc, req.body.date, userInfo.id, req.body.postId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created.");
    });
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json("권한이 없습니다.");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.id;
    const q = "DELETE FROM comments WHERE `comments_id` = ? AND `userId` = ?";
    db.query(q, [commentId, userInfo.id], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.affectedRows > 0) {
        return res.json("Comment has been deleted!");
      }
      return res.status(403).json("자신의 글만 삭제가 가능합니다.");
    });
  });
};

export const updateComment = function (req, res) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.id;
    const q = "UPDATE posts SET `desc`=?, WHERE `id` = ? AND `uid` = ?";

    db.query(q, [req.body.desc, commentId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json(err);
      return res.json("Post has been updated.");
    });
  });
};
