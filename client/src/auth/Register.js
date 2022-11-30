import { useState } from "react";
//react router
import { Link, useNavigate } from "react-router-dom";
//scss
import styles from "./Login.module.scss";
// axios
import axios from "axios";
//react toastify
import { toast } from "react-toastify";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  // const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
      toast.success("회원가입 성공");
    } catch (err) {
      toast.error(err.response.responseText);
      // setError(err.response.data);
    }
  };

  return (
    <div className={styles.auth}>
      <h1>회원 가입</h1>
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
          type="email"
          id="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>회원가입</button>
        {/* {err && <p>{err}</p>} */}
        <span>
          이미 회원 이신가요? <Link to="/login">로그인</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
