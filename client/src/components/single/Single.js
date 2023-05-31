import { useEffect, useState, useContext, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// login logout
import { AuthContext } from "../../context/authContext";
//  icons
import { AiOutlineEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// axios component
import axios from "axios";

import * as S from "./SingleStyle";
import { getDate } from "commons/libraries/utils";
import Comment from "components/comment/list/CommentsList";

export default function Single() {
  const { currentUser } = useContext(AuthContext);
  const userid = currentUser ? currentUser.users_id : null;
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
      alert(err);
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
    <S.Wrapper>
      <S.CardWrapper>
        <S.Header>
          <S.AvatarWrapper>
            <S.Avatar src="/images/avatar.png" />
            <S.Info>
              <div>{post?.cat}</div>
              <S.Writer>작성자 : {post?.username}</S.Writer>
              <S.CreatedAt>
                날짜 : {getDate(post?.date)}
                <S.PostViews>
                  <AiOutlineEye /> {post.view}
                </S.PostViews>
              </S.CreatedAt>
            </S.Info>
          </S.AvatarWrapper>
        </S.Header>
        <S.Body>
          <S.Title>{post?.title}</S.Title>
          <S.Contents dangerouslySetInnerHTML={{ __html: post.desc }} />
          <S.LikeWrapper>
            <S.IconWrapper>
              {heartShift ? (
                <S.LikeButton onClick={likeClick}>
                  <AiFillHeart color="red" />
                  추천 ({likes.length})
                </S.LikeButton>
              ) : (
                <S.LikeButton onClick={likeClick}>
                  <AiOutlineHeart />
                  추천 ({likes.length})
                </S.LikeButton>
              )}
            </S.IconWrapper>
          </S.LikeWrapper>
        </S.Body>
      </S.CardWrapper>
      <S.BottomWrapper>
        <S.Button>
          <Link to="/">목록으로</Link>
        </S.Button>
        <S.Button>
          <Link to="/write?edit=2" state={post}>
            수정하기
          </Link>
        </S.Button>
        <S.Button onClick={handleDelete}>삭제하기</S.Button>
      </S.BottomWrapper>
      <Comment postId={postId} />
    </S.Wrapper>
  );
}
