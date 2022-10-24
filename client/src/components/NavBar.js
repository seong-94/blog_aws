import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-awesome-modal";

function NavBar() {
  const [submitmodal, setSubitModal] = useState(false);

  function handleModal() {
    setSubitModal(!submitmodal);
    console.log(submitmodal);
  }
  return (
    <div class="header_grid">
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
                <input type="text" name="id" />
              </div>
              <div className="login_input_div" style={{ marginTop: "40px" }}>
                <p> Password </p>
                <input type="text" name="password" />
              </div>

              <div className="submit_div">
                <div>
                  <input type="button" value="로그인" />
                </div>
                <div>
                  <input type="button" value="취소" onClick={handleModal} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default NavBar;
