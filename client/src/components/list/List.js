import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Paging from "../pagination/Paging";
import moment from "moment";
import styles from "./List.module.scss";
import { AiOutlineEye } from "react-icons/ai";
function List({ listPerPage }) {
  //get posts
  const [posts, setPosts] = useState([]);
  //get username
  const [usernames, setUserName] = useState([]);
  //search for posts
  const [search, setSearch] = useState("");
  //pagination
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(listPerPage); //페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);

  const cat = useLocation().search;

  // get posts data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/auth/getuser`);
        setUserName(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  //search
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
    }
    setSearch("");
  };

  useEffect(() => {
    setCount(posts.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, posts, cat, postPerPage]);

  const setPage = (e) => {
    setCurrentpage(e);
  };

  console.log(currentPosts);

  return (
    <div className={styles.board_list}>
      <div className={styles.container}>
        {currentPosts && posts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.id}>
              <ul className={styles.list}>
                <li>
                  <Link to={`/post/${post.id}`}>
                    <h3>
                      <span className={styles.catname}>[{post.cat}]</span>
                      <span className={styles.title}>{post.title}</span>
                    </h3>
                  </Link>
                  <h4>
                    {usernames.map((name) => (
                      <span>
                        {post.uid === name.id ? name.username : `${""}`}
                      </span>
                    ))}
                    <span>{moment(post.date).format("YYYY-MM-DD")} </span>
                    <span>
                      <AiOutlineEye />
                    </span>
                    <span>{post.view}</span>
                    {/* <span> reply counting</span> */}
                  </h4>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <Paging page={currentpage} count={count} setPage={setPage} />
      <div id={styles.board_search}>
        <div className={styles.container}>
          <div className={styles.search_window}>
            <form onSubmit={(e) => onSearch(e)}>
              <input
                id={styles.search}
                type="text"
                maxLength="20"
                value={search}
                className={styles.search_input}
                placeholder="검색어를 입력해주세요."
                onChange={onChangeSearch}
              />
              <button
                type="submit"
                value="검색"
                className={`${styles.btn} ${styles.btn_dark}`}
              >
                검색
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
