import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
function NavBar() {
  return (
    <div className={styles.navbar_head}>
      <Link to="/login">로그인</Link>
    </div>
  );
}

export default NavBar;
