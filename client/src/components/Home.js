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
      <div id="home-left"></div>

      <div className="home_list">
        <div className="home_list_grid home_list_tit">
          <div>제목</div>
          <div>내용</div>
          <div>날짜</div>
          <div>조회수</div>
        </div>
        <List />

        {/* <Search /> */}
        {currentUser ? (
          <button className="write">
            <Link to="/write"> 글쓰기 </Link>
          </button>
        ) : null}
      </div>

      <div id="home-right"></div>
    </div>
  );
}

export default Home;
