import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-awesome-modal";
import { AuthContext } from "../context/authContext";

function NavBar() {
  //turn on/off modal pages
  const [submitmodal, setSubitModal] = useState(false);
  //send err on page
  const [err, setError] = useState(null);
  //convert signe up modal page
  const [signup, setSignUp] = useState(false);

  // login logout
  const { currentUser, logout } = useContext(AuthContext);
  const { login } = useContext(AuthContext);

  // get login data
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  // get register data
  const [loginInputs, setLoginInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      handleModal();
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleModal = () => {
    setSubitModal(!submitmodal);
  };

  const handlesingUp = () => {
    setSignUp(!signup);
    console.log(signup);
  };

  return (
    <div className="header_grid">
      <div className="acenter">
        <Link className="link_tit" to="/">
          <li> 게시판 NavBar </li>
        </Link>
        <li className="username">{currentUser?.username}</li>
        <div className="login_navbar">
          {currentUser ? (
            <li onClick={logout}>Logout</li>
          ) : (
            <li onClick={handleModal}>로그인</li>
          )}
        </div>
      </div>
      <Modal
        visible={submitmodal}
        width="40%"
        height="50%"
        effect="fadeInDown"
        onClickAway={handleModal}
      >
        {signup ? (
          <div className="container">
            <h1>SIGN IN</h1>
            <ul className="links">
              <li>
                <p className="signin" onClick={handlesingUp}>
                  SIGN IN
                </p>
              </li>
              <li>
                <p className="signup" onClick={handlesingUp}>
                  SIGN UP
                </p>
              </li>
            </ul>

            <form method="post">
              <div className="first-input input__block first-input__block">
                <input
                  type="text"
                  placeholder="ID"
                  className="input"
                  id="email"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="input__block">
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <button className="signin__btn" onClick={handleSubmit}>
                Sign in
              </button>
            </form>
            <div className="separator">
              <p>OR</p>
            </div>
            <button className="google__btn">
              <i className="fa fa-google"></i>
              Sign in with Google
            </button>
            <button className="github__btn">
              <i className="fa fa-github"></i>
              Sign in with GitHub
            </button>
          </div>
        ) : (
          <div className="container">
            <h1>SIGN UP</h1>
            <ul className="links">
              <li>
                <p className="signin" onClick={handlesingUp}>
                  SIGN IN
                </p>
              </li>
              <li>
                <p className="signup" onClick={handlesingUp}>
                  SIGN UP
                </p>
              </li>
            </ul>

            <form method="post">
              <div className="first-input input__block first-input__block">
                <input
                  type="text"
                  placeholder="ID"
                  className="input"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="input__block">
                <input
                  type="email"
                  placeholder="email"
                  className="input"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="input__block">
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <button className="signin__btn" onClick={handleSubmit}>
                Sign up
              </button>
            </form>
            <div className="separator">
              <p>OR</p>
            </div>
            <button className="google__btn">
              <i className="fa fa-google"></i>
              Sign in with Google
            </button>
            <button className="github__btn">
              <i className="fa fa-github"></i>
              Sign in with GitHub
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default NavBar;
