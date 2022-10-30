import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import List from "./List";

// import Paging from "./Pagination";

function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="home-left"></div>
      <div>
        <List />

        {/* <Search /> */}
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
