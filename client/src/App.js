// react-router
import { BrowserRouter, Routes, Route } from "react-router-dom";
//scss
import styles from "./App.module.scss";
// import components
import { Login, Register } from "./auth/authIndex";
import { Category, Home, Single, Write, NavBar } from "./components/cpIndex";

//react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <ToastContainer />
        <Category />
        <div className={styles.container}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/post/:id" element={<Single />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
