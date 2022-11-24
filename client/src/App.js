import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./components/Category";
import Home from "./components/Home";
import Single from "./components/Single";
import Write from "./components/Write";
import styles from "./App.module.scss";
import NavBar from "./components/NavBar";
import Login from "./components/Login";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Category />
        <div className={styles.container}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/post/:id" element={<Single />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
