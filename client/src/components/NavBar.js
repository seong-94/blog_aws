import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-awesome-modal";
import { AuthContext } from "../context/authContext";

function NavBar() {
  const [submitmodal, setSubitModal] = useState(false);

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
    } catch (err) {
      setError(err.response.data);
    }
  };
  const handleModal = () => {
    setSubitModal(!submitmodal);
  };
  return (
    <div className="header_grid">
      <div> </div>
      <div className="acenter">
        <Link className="link_tit" to="/">
          <h3> 게시판 NavBar </h3>
        </Link>
      </div>
      <h5 className="login_navbar" onClick={handleModal}>
        로그인
      </h5>
      <Modal
        visible={submitmodal}
        width="400"
        height="360"
        effect="fadeInDown"
        onClickAway={handleModal}
      >
        <div>
          <form>
            <div className="login_div">
              <h4 className="acenter login_tit">로그인</h4>
              <div className="login_input_div">
                <p> ID </p>
                <input
                  type="text"
                  placeholder="ID"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="login_input_div">
                <p> Password </p>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>

              <div className="submit_div">
                <div>
                  <input type="button" value="로그인" onClick={handleSubmit} />
                </div>
                <div>
                  <input type="button" value="취소" onClick={handleModal} />
                </div>
                <div>
                  <Link to="/register">
                    <input type="button" value="회원가입 추후 제작 예정" />
                  </Link>
                </div>
                {err && <p>{err}</p>}
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default NavBar;
