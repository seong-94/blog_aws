import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Paging from "./Paging";

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
    <div className="List">
      {currentPosts && posts.length > 0 ? (
        currentPosts.map((post) => (
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
        ))
      ) : (
        <div>없음 </div>
      )}
      <Paging page={currentpage} count={count} setPage={setPage} />
      <div>
        <form onSubmit={(e) => onSearch(e)}>
          <input
            type="text"
            maxLength="20"
            value={search}
            className="search_input"
            placeholder="검색어를 입력해주세요."
            onChange={onChangeSearch}
          />
          <input type="submit" value="검색" className="serach_submit" />
        </form>
      </div>
    </div>
  );
}

export default List;
