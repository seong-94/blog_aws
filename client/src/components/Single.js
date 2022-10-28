import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

function Single() {
  const [post, setPost] = useState({});

  // const cat = useLocation().search;
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <div className="info">
          <span>작성자 : {post.username}</span>
          <p>날짜 : {post.date}</p>
        </div>
        {currentUser.username === post.username && (
          <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <span>글 고치기</span>
            </Link>
            <span onClick={handleDelete}>지우기 </span>
          </div>
        )}
        <div className="post">
          <h1>{post.title}</h1>
          <p>{getText(post.desc)}</p>
        </div>
      </div>
    </div>
  );
}

export default Single;
