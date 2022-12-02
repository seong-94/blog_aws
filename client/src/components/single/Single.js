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
import Comments from "../comment/Comments";
function Single() {
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState([]);
  const [likeShift, setLikeShift] = useState(likes.includes(currentUser.id));
  const location = useLocation();
  const navigate = useNavigate();
  // count of lists
  const [setList] = useState(5);
  const postId = location.pathname.split("/")[2];

  console.log(likes.includes(currentUser.id));
  console.log(likeShift);
  // console.log(typeof currentUser.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${post.id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [post.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/likes?postId=` + post.id);
        setLikes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [post.id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post.id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const likeClick = async () => {
    try {
      await axios.post(`/likes`, { postId: post.id, userId: currentUser.id });
      setLikeShift(!likeShift);
    } catch (err) {
      console.log(err);
    }
  };
  const unLikeClick = async () => {
    try {
      await axios.delete(`/likes`, {
        data: { postId: postId },
      });
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
                <button onClick={unLikeClick}>
                  <AiFillHeart color="red" />
                  추천 ({likes.length})
                </button>
              ) : (
                <button onClick={likeClick}>
                  <AiOutlineHeart />
                  추천 ({likes.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Comments postId={postId} />
      </div>
      <List listPerPage={setList} />
    </div>
  );
}

export default Single;
