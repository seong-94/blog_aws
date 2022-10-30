import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import axios from "axios";
import moment from "moment";
function Single({ username }) {
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
    <div>
      <div className="single">
        <div className="single_left">카테고리</div>
        <div className="content">
          <h1>{post.title}</h1>
          <div className="info">
            <span>작성자 : {""}</span>
            <p>날짜 : {moment(post.date).format("YYYY-MM-DD")}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img src={Delete} alt="" onClick={handleDelete} />
            </div>
          )}
          <div className="post">
            <p>{getText(post.desc)}</p>
          </div>
        </div>
        <div className="single_right">음... 뭐넣지</div>
      </div>
    </div>
  );
}

export default Single;
