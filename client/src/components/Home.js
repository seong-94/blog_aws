import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Category from "./Category";

import List from "./List";
import NavBar from "./NavBar";

// import Paging from "./Pagination";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [listPerPage] = useState(10);
  return (
    <div className="home">
      <div className="home-left">
        <Category />
      </div>
      <div className="home_middle">
        <NavBar />
        <List listPerPage={listPerPage} />
        {currentUser ? (
          <button className="write">
            <Link to="/write"> 글쓰기 </Link>
          </button>
        ) : null}
      </div>

      <div className="home-right"></div>
    </div>
  );
}

export default Home;
