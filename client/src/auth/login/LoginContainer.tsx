import React, { useState, useContext, ChangeEvent, MouseEvent } from "react";
//react router
import { useNavigate } from "react-router-dom";
//login auth
import { AuthContext } from "../../context/authContext";

//react-toastify
import { toast } from "react-toastify";
import LoginPresent from "./LoginPresenter";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState("");

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await login(inputs);
      navigate("/");
      toast.success("로그인 성공");
    } catch (err: any) {
      alert(err.response.data);
    }
  };
  return (
    <>
      <LoginPresent
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        err={err}
      />
    </>
  );
}

export default Login;
