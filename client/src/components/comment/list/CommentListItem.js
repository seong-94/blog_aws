import React, { useState, useContext } from "react";
import * as S from "./CommentListStyles";
import axios from "axios";
import { AuthContext } from "context/authContext";
import { getDate } from "commons/libraries/utils";
import CommentWrite from "../Write/CommentWrite.tsx";

export default function CommentListItem(props) {
  const { currentUser } = useContext(AuthContext);
  const userid = currentUser ? currentUser.users_id : null;
  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteClick = async (event, id) => {
    event.preventDefault();
    try {
      await axios.delete(`/comments/${id}`);
      alert("댓글 이 삭제 돼었습니다.");
      window.location.replace(`/post/${props.postId}`);
    } catch (err) {
      alert(err.request.responseText);
    }
  };

  const onClickUpdate = () => {
    setIsEdit(true);
  };
  return (
    <>
      {!isEdit ? (
        <S.ItemWrapper key={props.comment.id}>
          <S.FlexWrapper>
            <S.Avatar src="/images/avatar.png" />
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer>{props.comment.username}</S.Writer>
              </S.WriterWrapper>
              <S.Contents>{props.comment.desc}</S.Contents>
            </S.MainWrapper>
            <S.OptionWrapper>
              {props.comment.userid === userid ? (
                <>
                  <S.UpdateIcon
                    src="/images/boardComment/list/update_icon.png"
                    onClick={onClickUpdate}
                  />
                  <S.DeleteIcon
                    src="/images/boardComment/list/delete_icon.png"
                    onClick={(event) =>
                      handleDeleteClick(event, props.comment.comments_id)
                    }
                  />
                </>
              ) : (
                <></>
              )}
            </S.OptionWrapper>
          </S.FlexWrapper>
          <S.DateString>{getDate(props.comment.date)}</S.DateString>
        </S.ItemWrapper>
      ) : (
        <CommentWrite
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          postId={props.postId}
        />
      )}
    </>
  );
}
