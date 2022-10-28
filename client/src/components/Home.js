import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import Search from "./Search";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import { useRecoilState } from "recoil";

// import Paging from "./Pagination";

function Home() {
  //pagination
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  //get posts
  const [posts, setPosts] = useState([]);
  // search post
  const [search, setSearch] = useState("");

  const { currentUser } = useContext(AuthContext);

  const handleValueChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // get posts data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // delete html tag(react quill bug)
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div id="home-left"></div>

      <div className="List">
        <div className="list_grid list_tit">
          <div>제목</div>
          <div>내용</div>
          <div>날짜</div>
          <div className="acenter">조회수</div>
        </div>
        {posts.slice(offset, offset + limit).map((post) => (
          <div className="list_grid list_data" key={post.id}>
            <Link className="link_title" to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <Link className="link_desc" to={`/post/${post.id}`}>
              <div> {getText(post.desc)}</div>
            </Link>
            <div>{post.date}</div>
            <div>조회수</div>
          </div>
        ))}

        <div>
          <Pagination
            total={posts.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
        <Search
          onchange={handleValueChange}
          value={search}
          setPosts={setPosts}
        />
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
