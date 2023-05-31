import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { RiDeleteBin6Line } from "react-icons/ri";
// scss
import styles from "./Comment.module.scss";
import CommentPaging from "../pagination/CommentPaging.js";

import moment from "moment";
import axios from "axios";
// react toastify
import { toast } from "react-toastify";

function Comment({ postId }) {
  const { currentUser } = useContext(AuthContext);
  const userid = currentUser ? currentUser.id : null;
  const username = currentUser ? currentUser.name : null;
  const [desc, setDesc] = useState("");
  const [getComment, setGetComment] = useState([]);
  //pagination
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(10); //페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState();

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

  const handleClick = async (e) => {
    e.preventDefault();
    if (desc === "") {
      toast.error("내용을 입력해주세요");
      return;
    }
    try {
      await axios.post(`/comments`, {
        postId,
        name: username,
        desc: desc,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
      window.location.replace(`/post/${postId}`);
      toast.success("댓글 성공");
    } catch (err) {
      toast.error(err.request.responseText);
      console.log(err);
    }
  };

  const handleDeleteClick = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`/comments/${id}}`);
      toast.success("댓글 이 삭제 돼었습니다.");
      window.location.replace(`/post/${postId}`);
    } catch (err) {
      toast.error(err.request.responseText);
      console.log(err);
    }
  };

  useEffect(() => {
    setCount(getComment.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(getComment.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, getComment, postPerPage]);

  const setPage = (e) => {
    setCurrentpage(e);
  };
  return (
    <div className={styles.comments}>
      <div className={styles.comment_count}>
        댓글 <span>{getComment.length}</span>
      </div>
      <div className={styles.write}>
        <input
          type="text"
          placeholder="내용을 입력해주세요"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>등록</button>
      </div>
      <div className={styles.comment}>
        {currentPosts.length ? (
          currentPosts.map((comment) => (
            <ul key={comment.id} className={styles.comment_list}>
              <li className={styles.comment_name}>
                {comment.username}
                {comment.userid === userid ? (
                  <button onClick={(e) => handleDeleteClick(e, comment.id)}>
                    {<RiDeleteBin6Line size={15} />}
                  </button>
                ) : (
                  <></>
                )}
              </li>
              <li className={styles.comment_desc}>{comment.desc}</li>
              <li className={styles.comment_date}>
                {moment(comment.date).format("YYYY-MM-DD HH:mm")}
              </li>
            </ul>
          ))
        ) : (
          <ul>
            <li>댓글을 작성해주세요</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Comment;
