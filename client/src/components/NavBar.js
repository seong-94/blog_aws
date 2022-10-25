import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-awesome-modal";
import { AuthContext } from "../context/authContext";

function NavBar() {
  const [submitmodal, setSubitModal] = useState(false);

  const { currentUser, logout } = useContext(AuthContext);

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
      handleModal();
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  const handleModal = () => {
    setSubitModal(!submitmodal);
  };
  return (
    <div className="header_grid">
      <div className="acenter">
        {currentUser ? (
          <h5>
            <Link to="/write"> 글쓰기 </Link>
          </h5>
        ) : null}
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
        width="50%"
        height="50%"
        effect="fadeInDown"
        onClickAway={handleModal}
      >
        <div className="container">
          <h1>SIGN IN</h1>
          <ul class="links">
            <li>
              <a href="#" id="signin">
                SIGN IN
              </a>
            </li>
            <li>
              <a href="#" id="signup">
                SIGN UP /**기능 추가 예정 */
              </a>
            </li>
          </ul>

          <form action="" method="post">
            <div className="first-input input__block first-input__block">
              <input
                type="email"
                placeholder="Email"
                className="input"
                id="email"
              />
            </div>
            <div className="input__block">
              <input
                type="password"
                placeholder="Password"
                className="input"
                id="password"
              />
            </div>
            <div className="input__block">
              <input
                type="password"
                placeholder="Repeat password"
                className="input repeat__password"
                id="repeat__password"
              />
            </div>
            <button className="signin__btn">Sign in</button>
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
      </Modal>
    </div>
  );
}

export default NavBar;
