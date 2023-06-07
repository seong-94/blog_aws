import { useEffect, useState, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// login logout
import { AuthContext } from "../../context/authContext";
//  icons

// axios component
import axios from "axios";

import SinglePresenter from "./SinglePresenter";

export default function SingleContainer() {
  const { currentUser } = useContext(AuthContext);
  const userid = currentUser?.users_id;
  const location = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [likes, setLikes] = useState([]);
  const [heartShift, setHeartShift] = useState(likes.includes(userid));

  const postId = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        const reslike = await axios.get(`/likes?postId=` + postId);
        setPost(res.data);
        setLikes(reslike.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    setHeartShift(likes.includes(userid));
  }, [userid, likes]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const likeClick = useCallback(() => {
    let is_heart = false;
    if (!likes.includes(userid)) {
      try {
        axios.post(`/likes`, {
          postId: postId,
          userId: userid,
        });
      } catch (err) {
        alert(err.request.responseText);
      }
      is_heart = true;
    } else {
      try {
        axios.delete(`/likes`, {
          data: { postId: postId },
        });
      } catch (err) {
        console.log(err);
      }
    }

    const fetchData = async () => {
      try {
        const reslike = await axios.get(`/likes?postId=` + postId);
        setLikes(reslike.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    setHeartShift(is_heart);
  }, [likes, userid, postId]);

  return (
    <>
      <SinglePresenter
        likeClick={likeClick}
        handleDelete={handleDelete}
        heartShift={heartShift}
        post={post}
        likes={likes}
        postId={postId}
      />
    </>
  );
}
