import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Single from "./components/Single";
import Write from "./components/Write";
import "./style.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <NavBar /> */}
                <Home />
              </>
            }
          />
          <Route
            path="/write"
            element={
              <>
                <NavBar />
                <Write />
              </>
            }
          />
          <Route
            path="/post/:id"
            element={
              <>
                <NavBar />
                <Single />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
