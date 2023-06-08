// react-router
import { BrowserRouter, Routes, Route } from "react-router-dom";
//scss
import styles from "./App.module.scss";
// import components
import { Login, Register } from "./auth/authIndex";
import { Home, Single, Write } from "./components/ComponentsIndex";
import MypagePresenter from "components/mypage/MypagePresenter";
import MypageContaier from "components/mypage/MypageContaier";

export default function App() {
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MypageContaier />} />
        </Routes>
      </div>
    </div>
  );
}
