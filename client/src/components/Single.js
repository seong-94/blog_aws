import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Single() {
  const [post, setPost] = useState({});

  // const cat = useLocation().search;
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  // const { currentUser } = useContext(AuthContext);

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
  return (
    <div className="Mains">
      <div className="posts">
        <div className="post">
          <div className="content">
            <Link className="link" to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <p>{getText(post.desc)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single;
