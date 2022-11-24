import React, { useState, useContext } from "react";
//react router
import { Link, useNavigate } from "react-router-dom";
//login auth
import { AuthContext } from "../context/authContext";
//scss
import styles from "./Login.module.scss";

//react-toastify
import { toast } from "react-toastify";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
      toast.success("로그인 성공");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className={styles.auth}>
      <h1>로그인</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>로그인</button>
        {err && <p>{err}</p>}
        <span>
          아이디가 없으신가요?<Link to="/register">회원가입</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
