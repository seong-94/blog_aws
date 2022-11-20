// import { useState, useEffect } from "react";
// import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./components/Category";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Single from "./components/Single";
import Write from "./components/Write";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        {/* <NavBar /> */}
        <Category />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/post/:id" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
