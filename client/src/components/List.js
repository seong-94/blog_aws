import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Paging from "./Paging";
import moment from "moment";
import styles from "./List.module.scss";

function List({ listPerPage }) {
  //get posts
  const [posts, setPosts] = useState([]);

  //search for posts
  const [search, setSearch] = useState("");
  //pagination
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(listPerPage); //페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);
  const { currentUser } = useContext(AuthContext);

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

  return (
    <div className={styles.board_list}>
      <div className={styles.container}>
        <table className={styles.board_table}>
          <thead>
            <tr>
              <th scope="col" className={styles.th_num}>
                번호
              </th>
              <th scope="col" className={styles.th_title}>
                제목
              </th>
              {/* <th scope="col" className="th-user">
                작성자
              </th> */}
              <th scope="col" className={styles.th_view}>
                조회수
              </th>
              <th scope="col" className={styles.th_date}>
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
                  {/* <td>{post.postusername}</td> */}
                  <td>{post.view}</td>
                  <td>{moment(post.date).format("YYYY-MM-DD")}</td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
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
                <button type="submit" value="검색" className={`${styles.btn} ${styles.btn_dark}`}>
                  검색
                </button>
              </form>
              {currentUser ? (
                <button className={styles.write}>
                  <Link to="/write"> 글쓰기 </Link>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
