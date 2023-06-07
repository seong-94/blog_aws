import { Link } from "react-router-dom";
// login logout
//  icons
import { AiOutlineEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import * as S from "./SingleStyle";
import { getDate, getText } from "commons/libraries/utils";
import Comment from "components/comment/list/CommentsList";

export default function SinglePresenter(props) {
  console.log(props.postId, "aaa");
  return (
    <S.Wrapper>
      <S.CardWrapper>
        <S.Header>
          <S.AvatarWrapper>
            <S.Avatar src="/images/avatar.png" />
            <S.Info>
              <div>{props.post?.cat}</div>
              <S.Writer>작성자 : {props.post?.username}</S.Writer>
              <S.CreatedAt>
                날짜 : {getDate(props.post?.date)}
                <S.PostViews>
                  <AiOutlineEye /> {props.post.view}
                </S.PostViews>
              </S.CreatedAt>
            </S.Info>
          </S.AvatarWrapper>
        </S.Header>
        <S.Body>
          <S.Title>{props.post?.title}</S.Title>
          <S.Contents>{getText(props.post.desc)}</S.Contents>
          <S.LikeWrapper>
            <S.IconWrapper>
              {props.heartShift ? (
                <S.LikeButton onClick={props.likeClick}>
                  <AiFillHeart color="red" />
                  추천 ({props.likes.length})
                </S.LikeButton>
              ) : (
                <S.LikeButton onClick={props.likeClick}>
                  <AiOutlineHeart />
                  추천 ({props.likes.length})
                </S.LikeButton>
              )}
            </S.IconWrapper>
          </S.LikeWrapper>
          <S.BottomWrapper>
            <S.Button>
              <Link to="/">목록으로</Link>
            </S.Button>
            <S.Button>
              <Link to="/write?edit=2" state={props.post}>
                수정하기
              </Link>
            </S.Button>
            <S.Button onClick={props.handleDelete}>삭제하기</S.Button>
          </S.BottomWrapper>
        </S.Body>
      </S.CardWrapper>
      <Comment postId={props.postId} />
    </S.Wrapper>
  );
}
