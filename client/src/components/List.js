import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Paging from "./Paging";
import moment from "moment";

function List() {
  //get posts
  const [posts, setPosts] = useState([]);

  //pagination
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(10); //페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);

  const setPage = (e) => {
    setCurrentpage(e);
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

  useEffect(() => {
    setCount(posts.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, posts, postPerPage]);

  // delete html tag(react quill bug)
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (search === null || search === "") {
      axios.get(`/posts`).then((res) => {
        setPosts(posts);
        setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
        setCurrentpage(1);
      });
    } else {
      const filerData = posts.filter((row) => row.title.includes(search));
      setCurrentPosts(filerData.slice(indexOfFirstPost, indexOfLastPost));
      setCurrentpage(1);
      //   console.log(search);
    }
    setSearch("");
  };

  return (
    <div id="board-list">
      <div></div>
      <div className="container">
        <table className="board-table">
          <thead>
            <tr>
              <th scope="col" className="th-num">
                번호
              </th>
              <th scope="col" className="th-title">
                제목
              </th>
              <th scope="col" className="th-date">
                등록일
              </th>
            </tr>
          </thead>

          <tbody>
            {currentPosts && posts.length > 0 ? (
              currentPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <th>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </th>
                  <td>{moment(post.date).format("YYYY-MM-DD")}</td>
                </tr>
              ))
            ) : (
              <div></div>
            )}
          </tbody>
        </table>
        <Paging page={currentpage} count={count} setPage={setPage} />
        <div id="board-search">
          <div className="container">
            <div className="search-window">
              <form onSubmit={(e) => onSearch(e)}>
                <input
                  id="search"
                  type="text"
                  maxLength="20"
                  value={search}
                  className="search_input"
                  placeholder="검색어를 입력해주세요."
                  onChange={onChangeSearch}
                />
                <button type="submit" value="검색" className="btn btn-dark">
                  검색
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
