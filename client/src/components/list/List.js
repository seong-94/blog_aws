// Hooks
import React, { useState, useEffect } from "react";
// react-router-dom
import { Link, useLocation } from "react-router-dom";
// import components
import { getDate } from "commons/libraries/utils";
import Paging from "../../commons/pagination/Paging";
import SearchBar from "commons/searchbar/SearchBar";
// axios
import axios from "axios";
// emotion
import * as S from "./ListStyles";
// react-icons
import { AiOutlineEye, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";

function List({ listPerPage }) {
  //get posts
  const [posts, setPosts] = useState([]);
  //get username
  // const [usernames, setUserName] = useState([]);
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
    const fetchData = async (e) => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

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

  return (
    <S.Wrapper>
      <>
        {currentPosts && posts.length > 0 ? (
          currentPosts.map((post) => (
            <S.InnerWrapper key={post.id}>
              <S.ListWrapper>
                <S.List key={post.id}>
                  <Link to={`/post/${post.posts_id}`}>
                    <h3>
                      <S.CategoryName>[{post.cat}]</S.CategoryName>
                      <S.ListTitle>{post.title}</S.ListTitle>
                    </h3>
                  </Link>
                  <h4>
                    <S.ListTItem>{post.username}</S.ListTItem>
                    <S.ListTItem>{getDate(post.date)} </S.ListTItem>
                    <S.ListTItem>
                      <AiOutlineEye />
                    </S.ListTItem>
                    <S.ListTItem>{post.view}</S.ListTItem>
                    <S.ListTItem>
                      <AiOutlineComment />
                    </S.ListTItem>
                    <S.ListTItem>{post.comments}</S.ListTItem>
                    <S.ListTItem>
                      <AiOutlineHeart />
                    </S.ListTItem>
                    <S.ListTItem>{post.likes}</S.ListTItem>
                  </h4>
                </S.List>
              </S.ListWrapper>
            </S.InnerWrapper>
          ))
        ) : (
          <></>
        )}
      </>
      <Paging page={currentpage} count={count} setPage={setPage} />
      <SearchBar
        onChangeSearch={onChangeSearch}
        search={search}
        onSearch={onSearch}
      />
    </S.Wrapper>
  );
}

export default List;
