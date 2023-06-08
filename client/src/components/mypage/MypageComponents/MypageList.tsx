import React from "react";
import * as S from "../MypageStyles";
import { IMypageListUIProps } from "../MypageTypes";
import { Link } from "react-router-dom";
import { AiOutlineComment, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { getDate } from "commons/libraries/utils";

export default function MypageList(props: IMypageListUIProps) {
  return (
    <div>
      {props.posts.map((post) => (
        <S.InnerWrapper key={post.id}>
          <S.ListWrapper>
            <S.List key={post.id}>
              <Link to={`/post/${post.posts_id}`}>
                <h3>
                  <S.CategoryName>[{post.cat}]</S.CategoryName>
                  <S.ListTitle>{post.title}</S.ListTitle>
                </h3>
              </Link>
              <S.ListUnderWrapper>
                <S.ListTItem>작성자 : {post.username}</S.ListTItem>
                <S.ListTItem>날짜 : {getDate(post.date)} </S.ListTItem>
                <S.ListTItem>
                  <AiOutlineEye />
                </S.ListTItem>
                <S.ListTItem>조회수 : {post.view}</S.ListTItem>
                <S.ListTItem>
                  <AiOutlineComment />
                </S.ListTItem>
                <S.ListTItem>댓글 : {post.comments}</S.ListTItem>
                <S.ListTItem>
                  <AiOutlineHeart />
                </S.ListTItem>
                <S.ListTItem>추천 : {post.likes}</S.ListTItem>
              </S.ListUnderWrapper>
            </S.List>
          </S.ListWrapper>
        </S.InnerWrapper>
      ))}
    </div>
  );
}
