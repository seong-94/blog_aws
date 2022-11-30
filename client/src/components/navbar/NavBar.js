import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function NavBar() {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className={styles.navbar_head}>
      {currentUser ? (
        <button className={styles.login_btn} onClick={logout}>
          로그아웃
        </button>
      ) : (
        <Link to="/login">
          <button className={styles.login_btn}>로그인</button>
        </Link>
      )}
      <Link to="/register">
        <button className={styles.login_btn}>회원 가입</button>
      </Link>
    </div>
  );
}

export default NavBar;
