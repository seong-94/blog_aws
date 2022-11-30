import { db } from "../db.js";

export const addLike = function (req, res) {
  const q = "INSERT INTO liker (`postid`,`userid`) VALUES (?)";
  const values = [req.body.postid, req.body.userid];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.json("like button has been clicked.");
  });
};

export const unlike = function (req, res) {
  const q = "DELETE FROM liker WHERE `userid` = ? AND `postid` = ?";
  db.query(q, [req.body.postid, req.body.userid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("like had been deleted");
  });
};

export const getlike = function (req, res) {
  const q = "SELECT * FROM liker";

  db.query(q, [req.body.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
