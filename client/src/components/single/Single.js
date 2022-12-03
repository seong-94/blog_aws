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
import { toast } from "react-toastify";
function Single() {
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState([]);
  const userid = currentUser ? currentUser.id : null;
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  // count of lists
  const [setList] = useState(5);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/likes?postId=` + postId);
        setLikes(res.data);
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

  const likeClick = async (e) => {
    try {
      await axios.post(`/likes`, {
        postId: postId,
        userId: userid,
      });
    } catch (err) {
      toast.error(err.request.responseText);
      console.log(err);
    }
  };

  const unLikeClick = async () => {
    try {
      await axios.delete(`/likes`, {
        data: { postId: postId },
      });
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
              <h3>{post.cat ? `[${post.cat}]` : ""}</h3>
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
              {likes.includes(userid) ? (
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
