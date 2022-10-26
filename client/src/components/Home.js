import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
// import Paging from "./Pagination";

function Home() {
  //pagination
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  //get posts
  const [posts, setPosts] = useState([]);
  // search post
  const [search, setSearch] = useState("");

  const handlePageChange = (page) => {
    setPage(page);
  };
  const onChangeSearch = (e) => {
    e.perventDefault();
    setSearch(e.target.value);
  };

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

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

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
            <div>날짜</div>
            <div>조회수</div>
          </div>
        ))}

        <div>
          <form>
            <input
              type="text"
              maxLength="20"
              className="search_input"
              name="search"
              placeholder="검색어를 입력해주세요."
              onChange={"onChangeSearch"}
            />
            <input type="submit" value="검색" className="serach_submit" />
          </form>
          <Pagination
            total={posts.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>

      <div id="home-right"></div>
    </div>
  );
}

export default Home;
