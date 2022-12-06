import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE username = ? OR email = ?";

  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json("틀린 비밀 번호 또는 아이디 입니다.");
    }
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("auth_token", token, {
        // httpOnly: true, /** https 가 아니라 보안에러 발생 */
        maxAge: 30 * 60 * 1000, //30 Mins
      })
      .status(200)
      .json(other)
      .redirect("/");
  });
};

export const logout = (req, res) => {
  res.clearCookie("auth_token", {
    // sameSite: "none", /** https 가 아니라 보안에러 발생 */
    // secure: true,  /** https 가 아니라 보안에러 발생 */
    withCredentials: true,
  });
  res.redirect(`/`);
  console.log(res);
};

export const getname = (req, res) => {
  const q = "SELECT `id`, `username` FROM users ";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};
