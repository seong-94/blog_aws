import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// login logout
import { AuthContext } from "../context/authContext";
//  icons
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash, BsPencil } from "react-icons/bs";

// get list component
import List from "./List";
// axios component
import axios from "axios";

//get time
import moment from "moment";

//scss
import styles from "./Single.module.scss";
function Single() {
  const [post, setPost] = useState({});

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

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
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
              <h3>{post.cat ? `${[post.cat]}` : ""}</h3>
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
            {/* <div className="post_thumbuparea">추천</div> */}
          </div>
        </div>
      </div>
      <List listPerPage={setList} />
    </div>
  );
}

export default Single;
