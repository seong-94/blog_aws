import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import axios from "axios";
import moment from "moment";
import Category from "./Category";
import List from "./List";
function Single() {
  const [post, setPost] = useState({});

  // const cat = useLocation().search;

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const [setList] = useState(5);
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

  // const getText = (html) => {
  //   const doc = new DOMParser().parseFromString(html, "text/html");
  //   return doc.body.textContent;
  // };

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
        <div className="single_left">
          <Category />
        </div>

        <div className="content">
          <div className="wrap_inner_view">
            <div className="view_post">
              <div className="post_head">
                <div className="post_title">
                  <h1>{post.title}</h1>
                </div>
                <div className="post_authorandtype">
                  <ul>
                    <li>작성자 : {post.username}</li>
                    <li>날짜 : {moment(post.date).format("YYYY-MM-DD")}</li>
                    <li>{post.cat ? `게시판 :  ${post.cat}` : ""}</li>
                    <li>조회수 : {post.view}</li>
                    {(currentUser ? currentUser.username : "") ===
                      post.username && (
                      <div className="edit">
                        <Link to={`/write?edit=2`} state={post}>
                          <img src={Edit} alt="" />
                        </Link>
                        <img src={Delete} alt="" onClick={handleDelete} />
                      </div>
                    )}
                  </ul>
                </div>
              </div>
              <div className="post_body">
                <div dangerouslySetInnerHTML={{ __html: post.desc }} />
              </div>
              {/* <div className="post_thumbuparea">추천</div> */}
            </div>
            <div className="list_div">
              <List listPerPage={setList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single;
