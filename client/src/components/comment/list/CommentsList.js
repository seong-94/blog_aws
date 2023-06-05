import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
// import * as S from "./CommentListStyles";

import axios from "axios";

import CommentListItem from "./CommentListItem";
import CommentWrite from "../Write/CommentWrite";

export default function CommentList({ postId }) {
  const { currentUser } = useContext(AuthContext);
  // const userid = currentUser ? currentUser.id : null;
  const username = currentUser ? currentUser.name : null;
  const [desc, setDesc] = useState("");
  const [getComment, setGetComment] = useState([]);

  //pagination
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(10); //페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/comments?postId=" + postId);
        setGetComment(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  // const onHandleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (desc === "") {
  //     alert("내용을 입력해주세요");
  //     return;
  //   }
  //   try {
  //     await axios.post(`/comments`, {
  //       postId,
  //       name: username,
  //       desc: desc,
  //       date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  //     });
  //     window.location.replace(`/post/${postId}`);
  //     alert("댓글 성공적으로 입력돼었습니다.");
  //   } catch (err) {
  //     alert(err.request.responseText);
  //     console.log(err);
  //   }
  // };

  const handleDeleteClick = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`/comments/${id}}`);
      alert("댓글 이 삭제 돼었습니다.");
      window.location.replace(`/post/${postId}`);
    } catch (err) {
      alert(err.request.responseText);
      console.log(err);
    }
  };

  useEffect(() => {
    setCount(getComment.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(getComment.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, getComment, postPerPage]);

  return (
    <>
      <CommentWrite postId={postId} desc={desc} />
      {getComment.map((comment) => (
        <CommentListItem comment={comment} postId={postId} />
      ))}
    </>
  );
}
