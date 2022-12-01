import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// login logout
import { AuthContext } from "../../context/authContext";
//  icons
import { AiOutlineEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsTrash, BsPencil } from "react-icons/bs";

// get list component
import List from "../list/List";
// axios component
import axios from "axios";

//get time
import moment from "moment";

//scss
import styles from "./Single.module.scss";
function Single() {
  const [post, setPost] = useState({});
  const [likeShift, setLikeShift] = useState(false);
  const [getLikeId, setGetLikeId] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  // count of lists
  const [setList] = useState(5);

  const Lid = getLikeId.map((like) => like.id);
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

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/likes/getlike`);
        setGetLikeId(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const likeClick = async () => {
    try {
      await axios.post(`/likes/like`, {
        postid: postId,
        userid: currentUser.id,
      });
      setLikeShift(!likeShift);
    } catch (err) {
      console.log(err);
    }
  };

  const likeDeleteClick = async () => {
    try {
      await axios.delete(`/likes/${Lid}`);
      setLikeShift(!likeShift);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.single}>
      <div className={styles.content}>
        <div className={styles.wrap_inner_view}>
          <div className={styles.view_post}>
            <div className={styles.post_title}>
              {/* <Link to={/?cat=post.cat}> */}
              <h3>{post.cat ? `[${post.cat}]` : ""}</h3>
              {/* </Link> */}
              <h1>{post.title}</h1>
            </div>
            <div className={styles.post_author}>
              <span className={styles.username}>
                {(currentUser ? currentUser.username : "") ===
                  post.username && (
                  <div className={styles.edit}>
                    <Link to={`/write?edit=2`} state={post}>
                      <BsPencil size={20} className={styles.single_pencil} />
                    </Link>
                    <BsTrash
                      className={styles.delete}
                      onClick={handleDelete}
                      size={20}
                    />
                  </div>
                )}
                {post.username}
              </span>
            </div>
            <div className={styles.post_info}>
              <span> {moment(post.date).format("YYYY-MM-DD")}</span>
              <span className={styles.post_viewcount}>
                <AiOutlineEye /> {post.view}
              </span>
            </div>
            <div className={styles.post_body}>
              <div dangerouslySetInnerHTML={{ __html: post.desc }} />
            </div>
            <div className={styles.post_like}>
              {likeShift ? (
                <button onClick={likeDeleteClick}>
                  <AiFillHeart color="red" />
                  추천
                </button>
              ) : (
                <button onClick={likeClick}>
                  <AiOutlineHeart />
                  추천
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <List listPerPage={setList} />
    </div>
  );
}

export default Single;
